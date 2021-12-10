import { ResetPasswordUserController } from '@modules/accounts/useCases/resetPasswordUser/ResetPasswordUserController';
import { SendForgotPasswordMailController } from '@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController';
import { SendForgotPasswordMailUseCase } from '@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailUseCase';
import {Router} from 'express'

const passwordRoutes = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController()
const resetPasswordController = new ResetPasswordUserController()


passwordRoutes.post("/forgot", sendForgotPasswordMailController.handle)
passwordRoutes.post("/reset", resetPasswordController.handle)

export {passwordRoutes}