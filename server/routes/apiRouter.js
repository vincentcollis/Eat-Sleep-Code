import { Router } from 'express';
const apiRouter = Router();
apiRouter.get('/', (_req, res) => {
    res.status(200).send('api endpoint hit');
});
export default apiRouter;
