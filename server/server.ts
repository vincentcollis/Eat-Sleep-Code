import express, { Request, Response, NextFunction } from 'express';
import apiRouter from './routes/apiRouter.js';
import { Pool } from 'pg';

import databaseRouter from './routes/databaseRouter.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 8080;

// Establish Connection Pool
const SERVER_PASSWORD = process.env.SERVER_PASSWORD;
const postgresURI = `postgresql://postgres.bcgzannfugcqgvubsmsy:${SERVER_PASSWORD}@aws-0-us-east-1.pooler.supabase.com:6543/postgres`;

// Create a connect pool
export const pool = new Pool({
	connectionString: postgresURI,
});

app.use(express.json());
app.use(cors());

// API Router Handler
app.use('/api/questions', databaseRouter);

// API Router Handler
app.use('/api', apiRouter);

// Standard 404 Route Handler
app.use('/', (_req, res) => {
	res.status(404).send('Error page not found!');
});

// Express Global Error Handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
	console.log(err);
	res.status(500).json(err);
});

// Starts the app on the given port
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
