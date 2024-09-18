import pkg from 'pg';
const { Pool } = pkg;

// // Establish Connection Pool
const SERVER_PASSWORD = process.env.SERVER_PASSWORD;

const postgresURI = `postgresql://postgres.bcgzannfugcqgvubsmsy:${SERVER_PASSWORD}@aws-0-us-east-1.pooler.supabase.com:6543/postgres`;

// // Create a connect pool
const pool = new Pool({
	connectionString: postgresURI,
});

export default pool;
