import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Appointment } from '../../interfaces/appointment';
import appointmentsData from '../../data/appointments.json';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {
  private readonly storageKey = 'appointments';

  constructor() {
    if (!localStorage.getItem(this.storageKey)) {
      localStorage.setItem(this.storageKey, JSON.stringify(appointmentsData));
    }
  }

  getAppointments(): Observable<Appointment[]> {
    const raw = localStorage.getItem(this.storageKey);
    const appointments: Appointment[] = raw ? JSON.parse(raw) : appointmentsData;
    return of(appointments);
  }

  createAppointment(appointment: Appointment): Observable<Appointment> {
    const raw = localStorage.getItem(this.storageKey);
    const appointments: Appointment[] = raw ? JSON.parse(raw) : [];
    const newAppointment = { ...appointment, id: Date.now() };
    appointments.push(newAppointment);
    localStorage.setItem(this.storageKey, JSON.stringify(appointments));
    return of(newAppointment);
  }

  updateAppointment(appointment: Appointment): Observable<Appointment> {
    const raw = localStorage.getItem(this.storageKey);
    let appointments: Appointment[] = raw ? JSON.parse(raw) : [];
    appointments = appointments.map(a => (a.id === appointment.id ? appointment : a));
    localStorage.setItem(this.storageKey, JSON.stringify(appointments));
    return of(appointment);
  }

  deleteAppointment(id: number): Observable<void> {
    const raw = localStorage.getItem(this.storageKey);
    let appointments: Appointment[] = raw ? JSON.parse(raw) : [];
    appointments = appointments.filter(a => a.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(appointments));
    return of();
  }

  getAppointmentById(id: number): Observable<Appointment> {
    const raw = localStorage.getItem(this.storageKey);
    const appointments: Appointment[] = raw ? JSON.parse(raw) : [];
    const appointment = appointments.find(a => a.id === id)!;
    return of(appointment);
  }
}
