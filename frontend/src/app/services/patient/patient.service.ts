import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Patient } from '../../interfaces/patient';
import patientsData from '../../data/patients.json';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private readonly storageKey = 'patients';

  constructor() {
    if (!localStorage.getItem(this.storageKey)) {
      localStorage.setItem(this.storageKey, JSON.stringify(patientsData));
    }
  }

  getPatients(): Observable<Patient[]> {
    const raw = localStorage.getItem(this.storageKey);
    const patients: Patient[] = raw ? JSON.parse(raw) : patientsData;
    return of(patients);
  }

  createPatient(patient: Patient): Observable<Patient> {
    const raw = localStorage.getItem(this.storageKey);
    const patients: Patient[] = raw ? JSON.parse(raw) : [];
    const newPatient = { ...patient, id: Date.now() };
    patients.push(newPatient);
    localStorage.setItem(this.storageKey, JSON.stringify(patients));
    return of(newPatient);
  }

  updatePatient(patient: Patient): Observable<Patient> {
    const raw = localStorage.getItem(this.storageKey);
    let patients: Patient[] = raw ? JSON.parse(raw) : [];
    patients = patients.map(p => (p.id === patient.id ? patient : p));
    localStorage.setItem(this.storageKey, JSON.stringify(patients));
    return of(patient);
  }

  deletePatient(id: number): Observable<void> {
    const raw = localStorage.getItem(this.storageKey);
    let patients: Patient[] = raw ? JSON.parse(raw) : [];
    patients = patients.filter(p => p.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(patients));
    return of();
  }

  getPatientById(id: number): Observable<Patient> {
    const raw = localStorage.getItem(this.storageKey);
    const patients: Patient[] = raw ? JSON.parse(raw) : [];
    const patient = patients.find(p => p.id === id)!;
    return of(patient);
  }
}
