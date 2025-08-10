import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Prescription } from '../../interfaces/prescription';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {
  private readonly baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  createPrescription(prescription: any): Observable<Prescription> {
    return this.http.post<Prescription>(`${this.baseUrl}/prescriptions`, prescription);
  }

  updatePrescription(prescription: Prescription): Observable<Prescription> {
    return this.http.put<Prescription>(`${this.baseUrl}/prescriptions/${prescription.id}`, prescription);
  }

  deletePrescription(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/prescriptions/${id}`);
  }
}
