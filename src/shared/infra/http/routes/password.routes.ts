import { SendForgotPasswordMailController } from '@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController';
import { SendForgotPasswordMailUseCase } from '@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailUseCase';
import {Router} from 'express'

const passwordRoutes = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController()

passwordRoutes.post("/forgot", sendForgotPasswordMailController.handle)

export {passwordRoutes}