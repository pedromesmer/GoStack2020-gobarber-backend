import { Request, Response } from 'express';

import { container } from 'tsyringe';

import ResetPasswordEmailService from '@modules/users/services/ResetPasswordEmailService';

export default class SessiosController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { password, token } = request.body;

    const resetPasswordEmail = container.resolve(ResetPasswordEmailService);

    await resetPasswordEmail.execute({ password, token });

    return response.status(204).send();
  }
}
