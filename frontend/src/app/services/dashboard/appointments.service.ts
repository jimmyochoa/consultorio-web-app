import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment } from '../../interfaces/appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {
  private readonly baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getAppointments(): Observable<Appointment[]> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const doctorId = user?.id;

    return this.http.get<Appointment[]>(`${this.baseUrl}/appointments/doctor/${doctorId}`);
  }

  createAppointment(appointment: Appointment): Observable<Appointment> {
    return this.http.post<Appointment>(`${this.baseUrl}/appointments`, appointment);
  }

  updateAppointment(appointment: Appointment): Observable<Appointment> {
    return this.http.put<Appointment>(`${this.baseUrl}/appointments/${appointment.id}`, appointment);
  }

  deleteAppointment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/appointments/${id}`);
  }
}