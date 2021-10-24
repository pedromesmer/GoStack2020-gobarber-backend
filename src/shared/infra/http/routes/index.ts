import { Router } from 'express';

import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passowordRouter from '@modules/users/infra/http/routes/password.routes';

const routes = Router();

// toda rota com '/appointments' entra nessa função, enviando o resto da rota
routes.use('/appointments', appointmentsRouter);
// toda rota com '/users' entra nessa função, enviando o resto da rota
routes.use('/users', usersRouter);
// toda rota com '/sessions' entra nessa função, enviando o resto da rota
routes.use('/sessions', sessionsRouter);

routes.use('/password', passowordRouter);

export default routes;
