import { Request, Response, NextFunction } from 'express';
import pool from '../utils/db.js';

const userController = {
	// Function to add a problem to the users board
	add_ProblemToBoard: async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> => {
		console.log('User is adding a problem to their board ');

		const user_id = res.locals.decodedToken.user_id;
		const { problem_id } = req.body; // Assuming user_id and problem_id come from req.body
		if (!user_id || !problem_id) {
			res.status(400).json({ error: 'user_id and problem_id are required' });
			return;
		}

		const query = `
      INSERT INTO users_problems (users_id, problems_id, completed, completed_at)
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
		} catch (err) {
			console.error('Database query error', err);
			res.status(500).json({ error: 'Failed to add problem to board' });
		}
	},

	// Function to update the completion status to a problem on the users board
	update_SetProblemToComplete: async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> => {
		console.log('User is marking a problem as completed');

		const user_id = res.locals.decodedToken.user_id;
		const { problem_id } = req.body; // Expecting problem_id to be sent in the request body

		if (!user_id || !problem_id) {
			res.status(400).json({ error: 'user_id and problem_id are required' });
			return;
		}

		const query = `
      UPDATE users_problems
      SET completed = true, completed_at = NOW()
      WHERE users_id = $1 AND problems_id = $2;
    `;

		try {
			const client = await pool.connect(); // Get a client from the pool
			const result = await client.query(query, [user_id, problem_id]); // Parameterized query to avoid SQL injection

			client.release(); // Release the client back to the pool

			if (result.rowCount === 0) {
				res
					.status(404)
					.json({ message: 'No problem found for this user to mark as complete' });
				return;
			}

			// Respond with a success message or perform any other action
			res
				.status(200)
				.json({ message: 'Problem marked as completed successfully' });
		} catch (err) {
			console.error('Database query error', err);
			res.status(500).json({ error: 'Failed to mark problem as completed' });
		}
	},

	// Middleware to create a new user if they don't already exist based on users_id from GitHub OAuth
	create_newUser: async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> => {
		const { users_id, name, email, github_url } = req.body; // Expecting user data to be in the request body

		if (!users_id || !name || !email) {
			res
				.status(400)
				.json({ error: 'Missing required fields: users_id, name, or email' });
			return;
		}

		try {
			// Connect to the database
			const client = await pool.connect();

			// Use INSERT ON CONFLICT to insert the user if they don't already exist
			// Check for conflicts based on the users_id from GitHub OAuth
			const query = `
        INSERT INTO users (users_id, name, email, github_url)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (users_id) DO NOTHING
        RETURNING *;
      `;

			// Execute the query with user data (checking for conflicts on users_id)
			const result = await client.query(query, [
				users_id,
				name,
				email,
				github_url,
			]);

			client.release(); // Release the connection back to the pool

			if (result.rows.length > 0) {
				console.log('New user created:', result.rows[0]);
				res.locals.newUser = result.rows[0]; // Storing new user data in res.locals for further use
			} else {
				console.log('User already exists with users_id:', users_id);
				// Fetch existing user if no new user was created
				const existingUserQuery = 'SELECT * FROM users WHERE users_id = $1';
				const existingUserResult = await pool.query(existingUserQuery, [users_id]);
				res.locals.newUser = existingUserResult.rows[0]; // Store the existing user data
			}

			next(); // Proceed to the next middleware or route handler
		} catch (error) {
			console.error('Error checking or creating user:', error);
			res.status(500).json({ error: 'Failed to check or create user' });
		}
	},
};

export default userController;
