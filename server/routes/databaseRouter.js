import express from 'express';
const databaseRouter = express.Router();
databaseRouter.get('/', (_req, res) => {
    res.status(200).send('get all quesitons endpoint');
});
export default databaseRouter;
