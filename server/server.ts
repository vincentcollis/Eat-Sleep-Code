import express, { Request, Response, NextFunction } from 'express';
import apiRouter from './routes/apiRouter.js';

import databaseRouter from './routes/databaseRouter.js';
import cors from 'cors';
import admin from 'firebase-admin';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 8080;
process.env.GOOGLE_APPLICATION_CREDENTIALS = path.join(__dirname, process.env.GOOGLE_APPLICATION_CREDENTIALS as string);

admin.initializeApp({
  credential: admin.credential.cert(process.env.GOOGLE_APPLICATION_CREDENTIALS as string),
  //  databaseURL: process.env.FIREBASE_DATABASE_URL as string,
});

app.use(express.json());
app.use(cors());

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Forbidden' });
  }
};

// API Router Handler
app.use('/api/database', databaseRouter);

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
