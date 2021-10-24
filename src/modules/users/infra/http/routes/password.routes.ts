import { Router } from 'express';

import ForgotPasswordController from '../controllers/ForgotPassowordController';
import ResetPasswordController from '../controllers/ResetPassowordController';

const passowordRouter = Router();

const forgotPassoword = new ForgotPasswordController();
const resetPassword = new ResetPasswordController();

passowordRouter.post('/forgot', forgotPassoword.create);
passowordRouter.post('/reset', resetPassword.create);

export default passowordRouter;
