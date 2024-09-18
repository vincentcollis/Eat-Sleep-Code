import { Request, Response, NextFunction } from 'express';

import pool from '../utils/db.js';

const leaderBoardController = {
	// - completed most alltime

	//   - completed most daily
	getMostCompletedDailyList: (
		_req: Request,
		res: Response,
		next: NextFunction
	): void => {
		console.log('Most Completed Daily List');

		// A function to query the database using the pool
		const query = `
			SELECT * FROM public.problems;
		`;

		async function getMostCompletedDailyListQuery(query: string) {
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

		getMostCompletedDailyListQuery(query);
	},

	// - completed most weekly
	getMostCompletedWeeklyList: (
		_req: Request,
		res: Response,
		next: NextFunction
	): void => {
		console.log('Most Completed Weekly List');

		// A function to query the database using the pool
		const query = `
    SELECT * FROM public.problems;
  `;

		async function getMostCompletedWeeklyListQuery(query: string) {
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

		getMostCompletedWeeklyListQuery(query);
	},

	// - completed most alltime
	getMostCompletedAllTimeList: (
		_req: Request,
		res: Response,
		next: NextFunction
	): void => {
		console.log('Most Completed All Time List');

		// A function to query the database using the pool
		const query = `
			SELECT * FROM public.problems;
		`;

		async function getMostCompletedAllTimeListQuery(query: string) {
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

		getMostCompletedAllTimeListQuery(query);
	},
};

export default leaderBoardController;
