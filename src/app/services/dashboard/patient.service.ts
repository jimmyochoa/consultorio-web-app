import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient } from '../../interfaces/patient'; // Asegúrate de que la ruta sea correcta

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private patientsUrl = 'https://raw.githubusercontent.com/LeynderS/consultorio-datos/main/patients.json';

  constructor(private http: HttpClient) {}

  getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.patientsUrl);
  }

  // Puedes agregar otros métodos como add/update/delete si lo haces en memoria
}