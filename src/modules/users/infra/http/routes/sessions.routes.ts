import { Router } from 'express';
import { container } from 'tsyringe';

import AutenticateUserService from '@modules/users/services/AuthenticateUserService';

const sessionsRouter = Router();

// const usersRepository = new UsersReository();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticateUser = container.resolve(AutenticateUserService);

  const { user, token } = await authenticateUser.execute({
    email,
    password,
  });
  delete user.password;

  return response.json({ user, token });
});

export default sessionsRouter;
