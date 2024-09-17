import pool from '../db.js';
const databaseController = {
    getAllQuestions: (_req, res, next) => {
        console.log('getAllQuestions');
        // A function to query the database using the pool
        const query = `
			SELECT * FROM public.problems;
		`;
        async function queryDatabase(query) {
            try {
                const client = await pool.connect(); // Get a client from the pool
                const result = await client.query(query);
                client.release(); // Release the client back to the pool
                res.locals.problems = result.rows;
                // console.log(res.locals.problems);
                next();
                // return result.rows;
            }
            catch (err) {
                console.error('Database query error', err);
                throw err;
                next();
            }
        }
        queryDatabase(query);
    },
};
export default databaseController;
