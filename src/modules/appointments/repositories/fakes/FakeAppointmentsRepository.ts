import Appointment from '@modules/appointments/infra/typeorm/entities/Appointments';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
// eslint-disable-next-line import/no-extraneous-dependencies
import { v4 } from 'uuid';
import { isEqual } from 'date-fns';

class FakeAppointmentsReository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: v4(), date, provider_id });

    this.appointments.push(appointment);

    return appointment;
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(appointment.date, date),
    );

    return findAppointment;
  }
}

export default FakeAppointmentsReository;
