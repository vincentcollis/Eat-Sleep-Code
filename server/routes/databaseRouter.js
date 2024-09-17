import express from 'express';
import databaseController from '../controllers/databaseController.js';
const databaseRouter = express.Router();
databaseRouter.get('/all', databaseController.getAllQuestions, (_req, res) => {
    res.status(200).send(res.locals.problems);
});
export default databaseRouter;
