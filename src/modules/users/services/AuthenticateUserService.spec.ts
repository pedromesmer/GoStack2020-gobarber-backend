import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AutenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

describe('AuthenticateUSer', () => {
  it('should be able to autheticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const authenticateUser = new AutenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@domain.com',
      password: '123456',
    });

    const user = await authenticateUser.execute({
      email: 'johndoe@domain.com',
      password: '123456',
    });

    expect(user).toHaveProperty('token');
  });

  it('should not be able to autehnticate with non existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUser = new AutenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    expect(
      authenticateUser.execute({
        email: 'johndoe@domain.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to autehnticate user with wrong password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const authenticateUser = new AutenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@domain.com',
      password: '123456',
    });

    expect(
      authenticateUser.execute({
        email: 'johndoe@domain.com',
        password: '654321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
