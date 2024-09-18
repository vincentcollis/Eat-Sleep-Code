import express from 'express';
import leaderBoardController from '../controllers/leaderboardController.js';
const leaderBoardRouter = express.Router();
leaderBoardRouter.get('/', leaderBoardController.getMostCompletedDailyList, leaderBoardController.getMostCompletedWeeklyList, leaderBoardController.getMostCompletedAllTimeList, (_req, res) => {
    res.status(200).send(res.locals);
});
export default leaderBoardRouter;
