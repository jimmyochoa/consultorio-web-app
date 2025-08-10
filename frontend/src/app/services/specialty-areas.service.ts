// src/app/shared/services/specialties.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Specialty } from '../interfaces/Specialty';

@Injectable({ providedIn: 'root' })
export class SpecialtiesService {
  private readonly baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getSpecialties(): Observable<Specialty[]> {
    return this.http.get<Specialty[]>(`${this.baseUrl}/specialty-areas`);
  }
}
