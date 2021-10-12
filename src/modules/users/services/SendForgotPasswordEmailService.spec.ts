import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokenRepository from '../repositories/fakes/FakeUserTokensRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokenRepository: FakeUserTokenRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokenRepository = new FakeUserTokenRepository();

    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokenRepository,
    );
  });

  it('should be able to recover the password using the email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@domain.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'johndoe@domain.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to recove a non-exixtin using user password', async () => {
    await expect(
      sendForgotPasswordEmail.execute({
        email: 'johndoe@domain.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokenRepository, 'generate');

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@domain.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'johndoe@domain.com',
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
