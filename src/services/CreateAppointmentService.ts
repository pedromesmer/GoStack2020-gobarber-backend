import Appointment from '../models/Appointments'
import { startOfHour } from 'date-fns'
import { getCustomRepository } from 'typeorm'

import AppointmentsReository from '../repositories/AppointmentsRepository'
import AppError from '../errors/AppError'

interface RequestDTO {
    provider_id: string,
    date: Date
}

class CreateAppointmentService {
   

    public async execute({provider_id, date}: RequestDTO): Promise<Appointment> {

        const appointmentsRepository = getCustomRepository(AppointmentsReository)

        const appointmentDate = startOfHour(date)

        const findAppointmentInSameDate = await appointmentsRepository.findByDate(appointmentDate)

        if (findAppointmentInSameDate){
            throw new AppError("This appointment is already booked")
        }

        const appointment = appointmentsRepository.create({
            provider_id,
            date: appointmentDate
        })

        await appointmentsRepository.save(appointment)

        return appointment
    }
}

export default CreateAppointmentService
