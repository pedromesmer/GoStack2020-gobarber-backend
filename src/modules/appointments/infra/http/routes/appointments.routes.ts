import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';

const appointmentController = new AppointmentsController();

const appointmensRouter = Router();

// SoC - Separation of Concerns ( Separação de proecupações )
// DTO - Data Transfer Object

appointmensRouter.use(ensureAuthenticated);

// appointmensRouter.get('/', async (request, response) => {
//   const appointments = await appointmentsRepository.find();

//   return response.json(appointments);
// });

appointmensRouter.post('/', appointmentController.create);

export default appointmensRouter;
