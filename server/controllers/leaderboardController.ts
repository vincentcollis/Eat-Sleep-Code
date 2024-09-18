import { Request, Response, NextFunction } from 'express';

import pool from '../utils/db.js';

const leaderBoardController = {
	// - Completed most daily
	getMostCompletedDailyList: async (
		_req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> => {
		try {
			const query = `
      SELECT u.oauth_id, u.email, COUNT(up.id) AS total_completions
      FROM users_problems up
      JOIN users u ON up.oauth_id = u.oauth_id
      WHERE up.completed = true
      AND up.date_added::date = CURRENT_DATE
      GROUP BY u.oauth_id, u.email
      ORDER BY total_completions DESC;
    `;

			const result = await pool.query(query);
			res.locals.dailyLeaderboard = result.rows;
			next();
		} catch (error) {
			console.error('Error fetching daily leaderboard:', error);
			res.status(500).json({ error: 'Failed to fetch daily leaderboard' });
		}
	},

	// - Completed most weekly (Sunday - Saturday)
	// - Completed most weekly (Sunday - Saturday)
	getMostCompletedWeeklyList: async (
		_req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> => {
		try {
			const query = `
      SELECT u.oauth_id, u.email, COUNT(up.id) AS total_completions
      FROM users_problems up
      JOIN users u ON up.oauth_id = u.oauth_id
      WHERE up.completed = true
      AND up.date_added >= date_trunc('week', CURRENT_DATE) - interval '1 day'
      AND up.date_added < date_trunc('week', CURRENT_DATE) + interval '6 days'
      GROUP BY u.oauth_id, u.email
      ORDER BY total_completions DESC;
    `;

			const result = await pool.query(query);
			res.locals.weeklyLeaderboard = result.rows;
			next();
		} catch (error) {
			console.error('Error fetching weekly leaderboard:', error);
			res.status(500).json({ error: 'Failed to fetch weekly leaderboard' });
		}
	},

	// - Completed most all-time
	getMostCompletedAllTimeList: async (
		_req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> => {
		try {
			const query = `
      SELECT u.oauth_id, u.email, COUNT(up.id) AS total_completions
      FROM users_problems up
      JOIN users u ON up.oauth_id = u.oauth_id
      WHERE up.completed = true
      GROUP BY u.oauth_id, u.email
      ORDER BY total_completions DESC;
    `;

			const result = await pool.query(query);
			res.locals.allTimeLeaderboard = result.rows;
			next();
		} catch (error) {
			console.error('Error fetching all-time leaderboard:', error);
			res.status(500).json({ error: 'Failed to fetch all-time leaderboard' });
		}
	},
};

export default leaderBoardController;
