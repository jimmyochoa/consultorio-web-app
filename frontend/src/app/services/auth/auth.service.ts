import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Doctor } from '../../interfaces/doctor';
import { DoctorCreateRequest } from '../../interfaces/requests/DoctorCreateRequest';
import { DoctorLoginRequest } from '../../interfaces/requests/DoctorLoginRequest';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  register(data: DoctorCreateRequest) {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  login(data: DoctorLoginRequest) {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }
}
