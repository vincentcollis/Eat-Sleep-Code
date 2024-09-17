import express, { Request, Response, NextFunction } from 'express';

const databaseRouter = express.Router();

databaseRouter.get('/', (_req: Request, res: Response) => {
	res.status(200).send('get all quesitons endpoint');
});

export default databaseRouter;
