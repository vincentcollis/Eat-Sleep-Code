import pool from '../utils/db.js';
const leaderBoardController = {
    // - Completed most daily
    getMostCompletedDailyList: async (_req, res, next) => {
        try {
            const query = `
        SELECT u.users_id, u.name, COUNT(up.id) as total_completions
        FROM users_problems up
        JOIN users u ON up.user_id = u.id
        WHERE up.completed = true
        AND up.updated_at::date = CURRENT_DATE
        GROUP BY u.users_id, u.name
        ORDER BY total_completions DESC;
      `;
            const result = await pool.query(query);
            res.locals.dailyLeaderboard = result.rows;
            next();
        }
        catch (error) {
            console.error('Error fetching daily leaderboard:', error);
            res.status(500).json({ error: 'Failed to fetch daily leaderboard' });
        }
    },
    // - Completed most weekly (Sunday - Saturday)
    getMostCompletedWeeklyList: async (_req, res, next) => {
        try {
            const query = `
        SELECT u.users_id, u.name, COUNT(up.id) as total_completions
        FROM users_problems up
        JOIN users u ON up.user_id = u.id
        WHERE up.completed = true
        AND up.updated_at >= date_trunc('week', CURRENT_DATE)
        AND up.updated_at < date_trunc('week', CURRENT_DATE) + interval '1 week'
        GROUP BY u.users_id, u.name
        ORDER BY total_completions DESC;
      `;
            const result = await pool.query(query);
            res.locals.weeklyLeaderboard = result.rows;
            next();
        }
        catch (error) {
            console.error('Error fetching weekly leaderboard:', error);
            res.status(500).json({ error: 'Failed to fetch weekly leaderboard' });
        }
    },
    // - Completed most all-time
    getMostCompletedAllTimeList: async (_req, res, next) => {
        try {
            const query = `
        SELECT u.users_id, u.name, COUNT(up.id) as total_completions
        FROM users_problems up
        JOIN users u ON up.user_id = u.id
        WHERE up.completed = true
        GROUP BY u.users_id, u.name
        ORDER BY total_completions DESC;
      `;
            const result = await pool.query(query);
            res.locals.allTimeLeaderboard = result.rows;
            next();
        }
        catch (error) {
            console.error('Error fetching all-time leaderboard:', error);
            res.status(500).json({ error: 'Failed to fetch all-time leaderboard' });
        }
    },
};
export default leaderBoardController;
