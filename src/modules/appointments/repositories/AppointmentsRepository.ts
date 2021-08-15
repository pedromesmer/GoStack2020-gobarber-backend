import Appointment from '../../appointments/entities/Appointments'

import { EntityRepository, Repository } from 'typeorm'

@EntityRepository(Appointment)
class AppointmentsReository extends Repository<Appointment>{

    public async findByDate(date: Date): Promise<Appointment | null> {
        // const findAppointment = this.appointments.find(appointment =>
        //     isEqual(date, appointment.date)
        // )

        const findAppointment = await this.findOne({
            where: { date }
        })
        return findAppointment || null
    }

}

export default AppointmentsReository
