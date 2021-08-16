import { Router } from 'express';

import SessiosController from '../controllers/SessionsController';

const sessionsRouter = Router();

const sessionController = new SessiosController();

sessionsRouter.post('/', sessionController.create);

export default sessionsRouter;
