import express, { Request, Response } from 'express';

import userController from '../controllers/userController.js';

import verifyToken from '../utils/verify.js';

const userRouter = express.Router();

userRouter.post(
	'/create_user',
	verifyToken,
	userController.create_newUser,
	(_req: Request, res: Response) => {
		res.status(200).send(res.locals.problems);
	}
);

userRouter.post(
	'/add_ProblemToBoard',
	verifyToken,
	userController.add_ProblemToBoard,
	(req: Request, res: Response) => {
		res.status(200).send(res.locals.problems);
	}
);

userRouter.post(
	'/update_SetProblemToComplete',
	verifyToken,
	userController.update_SetProblemToComplete,
	(_req: Request, res: Response) => {
		res.status(200).send(res.locals.problems);
	}
);

export default userRouter;
