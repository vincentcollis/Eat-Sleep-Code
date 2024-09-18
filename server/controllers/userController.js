import pool from '../utils/db.js';
const userController = {
    // Function to add a problem to the users board
    add_ProblemToBoard: async (req, res, next) => {
        console.log('User is adding a problem to their board ');
        const user_id = res.locals.user_id;
        const problem_id = req.body; // Assuming user_id and problem_id come from req.body
        if (!user_id || !problem_id) {
            res.status(400).json({ error: 'user_id and problem_id are required' });
            return;
        }
        const query = `
      INSERT INTO users_problems (user_id, problem_id, completed, created_at)
      VALUES ($1, $2, false, NOW());
    `;
        try {
            const client = await pool.connect(); // Get a client from the pool
            await client.query(query, [user_id, problem_id]); // Parameterized query to avoid SQL injection
            client.release(); // Release the client back to the pool
            // Respond with a success message or perform any other action
            res
                .status(201)
                .json({ message: 'Problem added to user board successfully' });
        }
        catch (err) {
            console.error('Database query error', err);
            res.status(500).json({ error: 'Failed to add problem to board' });
        }
    },
    // Function to update the completion status to a problem on the users board
    update_ProblemCompletedStatus_IncrementByOne: async (req, res, next) => {
        const { user_id, problem_id, instance_id } = req.body;
        if (!user_id || !problem_id || !instance_id) {
            res
                .status(400)
                .json({ error: 'user_id, problem_id, and instance_id are required' });
            return;
        }
        try {
            const client = await pool.connect(); // Get a client from the pool
            // First, retrieve the current completed status for the specific instance (record)
            const currentStatusQuery = `
        SELECT completed 
        FROM users_problems 
        WHERE user_id = $1 AND problem_id = $2 AND id = $3;
      `;
            const currentStatusResult = await client.query(currentStatusQuery, [
                user_id,
                problem_id,
                instance_id,
            ]);
            if (currentStatusResult.rowCount === 0) {
                client.release();
                res.status(404).json({ error: 'No problem instance found for the user' });
                return;
            }
            const currentStatus = currentStatusResult.rows[0].completed;
            // Toggle the status
            const newStatus = !currentStatus;
            // If the new status is true, increment the `times_completed`
            let updateQuery;
            if (newStatus) {
                updateQuery = `
          UPDATE users_problems 
          SET completed = $1, times_completed = times_completed + 1, updated_at = NOW() 
          WHERE user_id = $2 AND problem_id = $3 AND id = $4;
        `;
            }
            else {
                updateQuery = `
          UPDATE users_problems 
          SET completed = $1, updated_at = NOW() 
          WHERE user_id = $2 AND problem_id = $3 AND id = $4;
        `;
            }
            // Execute the update query
            await client.query(updateQuery, [
                newStatus,
                user_id,
                problem_id,
                instance_id,
            ]);
            client.release(); // Release the client back to the pool
            // Respond with the new status
            res.status(200).json({
                message: 'Completed status updated successfully',
                newStatus,
            });
        }
        catch (err) {
            console.error('Error updating completed status:', err);
            res.status(500).json({ error: 'Failed to update problem status' });
        }
    },
};
export default userController;
