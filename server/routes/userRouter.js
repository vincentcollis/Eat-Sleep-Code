import express from 'express';
import userController from '../controllers/userController.js';
import verifyToken from '../utils/verify.js';
const userRouter = express.Router();
userRouter.post('/add_ProblemToBoard', verifyToken, userController.add_ProblemToBoard, (req, res) => {
    res.status(200).send(res.locals.problems);
});
userRouter.post('/update_ProblemCompletedStatus_IncrementByOne', verifyToken, userController.update_ProblemCompletedStatus_IncrementByOne, (_req, res) => {
    res.status(200).send(res.locals.problems);
});
export default userRouter;
