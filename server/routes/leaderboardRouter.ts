import express, { Request, Response } from 'express';

import leaderBoardController from '../controllers/leaderboardController.js';

const leaderBoardRouter = express.Router();

leaderBoardRouter.get(
	'/',
	leaderBoardController.getMostCompletedDailyList,
	leaderBoardController.getMostCompletedWeeklyList,
	leaderBoardController.getMostCompletedAllTimeList,
	(_req: Request, res: Response) => {
		res.status(200).send(res.locals);
	}
);

export default leaderBoardRouter;
