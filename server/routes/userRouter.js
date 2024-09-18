import express from 'express';
import userController from '../controllers/userController.js';
import verifyToken from '../utils/verify.js';
const userRouter = express.Router();
userRouter.post('/create_user', userController.create_newUser, (_req, res) => {
    res.sendStatus(200);
});
userRouter.post('/add_ProblemToBoard', verifyToken, userController.add_ProblemToBoard, (_req, res) => {
    res.sendStatus(200);
});
userRouter.post('/update_SetProblemToComplete', verifyToken, userController.update_SetProblemToComplete, (_req, res) => {
    res.sendStatus(200);
});
userRouter.get('/get_UserBoardProblems', verifyToken, userController.get_UserBoardProblems, (_req, res) => {
    res.status(200).send(res.locals.problems);
});
export default userRouter;
