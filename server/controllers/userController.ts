import { Request, Response, NextFunction } from 'express';
import pool from '../utils/db.js';

const userController = {
	// Function to add a problem to the users board

	add_ProblemToBoard: async (
		req: Request,
		res: Response,
		_next: NextFunction
	): Promise<void> => {
		console.log('User is adding a problem to their board ');
		// console.log("res.locals.decodedToken: ",res.locals.decodedToken)

		// Extract oauth_id and problem_id from req.body
		const oauth_id = res.locals.decodedToken.uid;

		const { problem_id } = req.body;
		// const { oauth_id, problem_id } = req.body;

		if (!oauth_id || !problem_id) {
			res.status(400).json({ error: 'oauth_id and problem_id are required' });
			return;
		}

		const query = `
			INSERT INTO users_problems (oauth_id, problems_id, completed, completed_at)
			VALUES ($1, $2, false, NOW())
			ON CONFLICT DO NOTHING; -- To avoid duplicate entries
		`;

		try {
			const client = await pool.connect(); // Get a client from the pool
			await client.query(query, [oauth_id, problem_id]); // Parameterized query to avoid SQL injection
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

	get_UserBoardProblems: async (
		_req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> => {
		console.log("Fetching all problems on user's board");

		// Extract oauth_id from res.locals.decodedToken
		const oauth_id = res.locals.decodedToken.uid;

		if (!oauth_id) {
			res.status(400).json({ error: 'oauth_id is required' });
			return;
		}

		const query = `
  		SELECT p.id, p.title, p.title_slug, p.difficulty, p.topic_tags, 
         up.completed, up.completed_at, up.date_added,
         (SELECT COUNT(*) FROM users_problems WHERE problems_id = p.id AND oauth_id = $1 AND completed = true) AS times_completed
			FROM users_problems up
			JOIN problems p ON up.problems_id = p.id
			WHERE up.oauth_id = $1
			ORDER BY up.date_added DESC;
		`;

		try {
			const client = await pool.connect(); // Get a client from the pool
			const result = await client.query(query, [oauth_id]); // Parameterized query to avoid SQL injection
			client.release(); // Release the client back to the pool

			if (result.rows.length === 0) {
				res.status(200).json({ message: "No problems found on user's board" });
				return;
			}

			// Respond with the list of problems on the user's board, including completion status and times_completed
			res.status(200).json({ problems: result.rows });
			next();
		} catch (err) {
			console.error('Database query error', err);
			res.status(500).json({ error: "Failed to fetch user's board problems" });
		}
	},

	// Function to update the completion status to a problem on the users board
	update_SetProblemToComplete: async (
		req: Request,
		res: Response,
		_next: NextFunction
	): Promise<void> => {
		console.log('User is marking a problem as completed');

		// Extract oauth_id and problem_id from req.body
		const oauth_id = res.locals.decodedToken.uid;
		const { problem_id } = req.body;

		if (!oauth_id || !problem_id) {
			res.status(400).json({ error: 'oauth_id and problem_id are required' });
			return;
		}

		const query = `
			UPDATE users_problems
			SET completed = true, completed_at = NOW()
			WHERE oauth_id = $1 AND problems_id = $2;
		`;

		try {
			const client = await pool.connect(); // Get a client from the pool
			const result = await client.query(query, [oauth_id, problem_id]); // Parameterized query to avoid SQL injection

			client.release(); // Release the client back to the pool

			if (result.rowCount === 0) {
				res
					.status(404)
					.json({ message: 'No problem found for this user to mark as complete' });
				return;
			}

			// Respond with a success message
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
		// Extract oauth_id from req.body
		const { oauth_id } = req.body;

		// Log oauth_id for debugging
		console.log('oauth_id: ', oauth_id);

		if (!oauth_id) {
			res.status(400).json({ error: 'Missing required field: oauth_id' });
			return;
		}

		try {
			// Connect to the database
			const client = await pool.connect();

			// Insert the user into the database, handling conflicts based on oauth_id
			const query = `
				INSERT INTO users (oauth_id)
				VALUES ($1)
				ON CONFLICT (oauth_id) DO NOTHING
				RETURNING *;
			`;

			// Execute the query with oauth_id
			const result = await client.query(query, [oauth_id]);

			// Release the client back to the pool
			client.release();

			if (result.rows.length > 0) {
				console.log('New user created:', result.rows[0]);
				res.locals.newUser = result.rows[0]; // Store the new user data in res.locals
			} else {
				console.log('User already exists with oauth_id:', oauth_id);
				// Fetch the existing user if the insert did not create a new one
				const existingUserQuery = 'SELECT * FROM users WHERE oauth_id = $1';
				const existingUserResult = await pool.query(existingUserQuery, [oauth_id]);
				res.locals.newUser = existingUserResult.rows[0]; // Store the existing user data
			}

			// Proceed to the next middleware or route handler
			next();
		} catch (error) {
			console.error('Error checking or creating user:', error);
			res.status(500).json({ error: 'Failed to check or create user' });
		}
	},
};

export default userController;
