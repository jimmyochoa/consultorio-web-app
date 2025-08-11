import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MetricsData } from '../../interfaces/metric';

@Injectable({
  providedIn: 'root',
})
export class MetricsService {
  private readonly baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getMetrics(): Observable<MetricsData> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const doctorId = user?.id;

    return this.http.get<MetricsData>(`${this.baseUrl}/metrics/${doctorId}`);
  }
}
