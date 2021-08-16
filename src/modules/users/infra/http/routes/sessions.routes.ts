import { Router } from 'express';

import AutenticateUserService from '@modules/users/services/AuthenticateUserService';
import UsersReository from '@modules/users/infra/typeorm/repositories/UsersRepository';

const sessionsRouter = Router();

// const usersRepository = new UsersReository();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const usersRepository = new UsersReository();
  const authenticateUser = new AutenticateUserService(usersRepository);

  const { user, token } = await authenticateUser.execute({
    email,
    password,
  });
  delete user.password;

  return response.json({ user, token });
});

export default sessionsRouter;
