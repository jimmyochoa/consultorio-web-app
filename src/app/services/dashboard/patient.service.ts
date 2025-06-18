import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Patient } from '../../interfaces/patient'; // Asegúrate de que la ruta sea correcta

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private patientsSubject = new BehaviorSubject<Patient[]>([]);
  private patientsUrl = 'https://raw.githubusercontent.com/LeynderS/consultorio-datos/main/patients.json';

  constructor() {
    this.loadInitialPatients();
  }

  private loadInitialPatients() {
    fetch('https://raw.githubusercontent.com/LeynderS/consultorio-datos/main/patients.json')
      .then(res => res.json())
      .then(data => this.patientsSubject.next(data))
      .catch(err => {
        console.error('Error cargando pacientes iniciales:', err);
        this.patientsSubject.next([]); // En caso de error, lista vacía
      });
  }

  getPatients(): Observable<Patient[]> {
    return this.patientsSubject.asObservable();
  }

    // Agrega un paciente y actualiza el BehaviorSubject
  addPatient(newPatient: Patient) {
    const current = this.patientsSubject.getValue();
    this.patientsSubject.next([...current, newPatient]);
  }

  // Edita un paciente (por id)
  updatePatient(updatedPatient: Patient) {
    const current = this.patientsSubject.getValue();
    const index = current.findIndex(p => p.id === updatedPatient.id);
    if (index !== -1) {
      current[index] = updatedPatient;
      this.patientsSubject.next([...current]);
    }
  }

  // Elimina paciente por id
  deletePatient(patientId: number) {
    const current = this.patientsSubject.getValue();
    this.patientsSubject.next(current.filter(p => p.id !== patientId));
  }

}