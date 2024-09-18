import express from 'express';
import userController from '../controllers/userController.js';
import verifyToken from '../utils/verify.js';
const userRouter = express.Router();
<<<<<<< HEAD
userRouter.post('/add_ProblemToBoard', 
// verifyToken,
userController.add_ProblemToBoard, (req, res) => {
    console.log('user controller: ', req.user);
=======
userRouter.post('/add_ProblemToBoard', verifyToken, userController.add_ProblemToBoard, (req, res) => {
>>>>>>> e626170039a65cc11e74d2048455b70063601be7
    res.status(200).send(res.locals.problems);
});
userRouter.post('/update_ProblemCompletedStatus_IncrementByOne', verifyToken, userController.update_ProblemCompletedStatus_IncrementByOne, (_req, res) => {
    res.status(200).send(res.locals.problems);
});
export default userRouter;
