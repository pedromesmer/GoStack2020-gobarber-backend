// Rotas: Receber a requisição, chamar outro arquivo, devolver uma resposta

import { Router} from 'express'
import { parseISO } from 'date-fns'
import { getCustomRepository } from 'typeorm'

import CreateAppointmentService from   '../modules/appointments/services/CreateAppointmentService'
import AppointmentsRepository from '../modules/appointments/repositories/AppointmentsRepository'

// parseISO converterá o formato ISO para Date() do js
// startOfHour colocará no início daquala hora, além dos minutos e segundos

import ensureAuthenticated from '../shared/middlewares/ensureAuthenticated'

const appointmensRouter = Router()

// SoC - Separation of Concerns ( Separação de proecupações )
// DTO - Data Transfer Object

appointmensRouter.use(ensureAuthenticated)

appointmensRouter.get('/', async (request, response) => {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository)
    const appointments = await appointmentsRepository.find()

    return response.json(appointments)
})

appointmensRouter.post('/', async (request, response) => {

    const {provider_id, date} = request.body

    const parsedDate = parseISO(date)

    const createAppointment = new CreateAppointmentService()

    const appointment = await createAppointment.execute({
        provider_id,
        date: parsedDate
    })

    return response.json(appointment)

})

export default appointmensRouter
