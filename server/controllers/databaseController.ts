import { Request, Response, NextFunction } from 'express';

import pool from '../db.js';

const databaseController = {
	getAllQuestions: (_req: Request, res: Response, next: NextFunction): void => {
		console.log('getAllQuestions');

		// A function to query the database using the pool

		const query = `
			SELECT * FROM public.problems;
		`;

		async function queryDatabase(query: string) {
			try {
				const client = await pool.connect(); // Get a client from the pool
				const result = await client.query(query);
				client.release(); // Release the client back to the pool

				res.locals.problems = result.rows;
				// console.log(res.locals.problems);
				next();
				// return result.rows;
			} catch (err) {
				console.error('Database query error', err);
				throw err;
				next();
			}
		}

		queryDatabase(query);
	},
};

export default databaseController;
