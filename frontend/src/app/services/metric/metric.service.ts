import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MetricsData } from '../../interfaces/metric';
import metricsData from '../../data/metrics.json';
import patientsData from '../../data/patients.json';
import appointmentsData from '../../data/appointments.json';

@Injectable({
  providedIn: 'root',
})
export class MetricsService {
  constructor() {}

  getMetrics(): Observable<MetricsData> {
    // leer pacientes y citas del storage (o json si no existen)
    const patients = JSON.parse(localStorage.getItem('patients') || JSON.stringify(patientsData));
    const appointments = JSON.parse(localStorage.getItem('appointments') || JSON.stringify(appointmentsData));

    // recalcular métricas dinámicas
    const updated: MetricsData = {
      ...metricsData,
      totalPatients: patients.length,
      pastAppointments: appointments.filter((a: any) => new Date(a.date) < new Date()).length,
      upcomingAppointments: appointments.filter((a: any) => new Date(a.date) >= new Date()).length
    };

    return of(updated);
  }
}
