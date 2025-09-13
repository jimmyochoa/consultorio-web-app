import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DoctorCreateRequest } from '../../interfaces/requests/DoctorCreateRequest';
import { DoctorLoginRequest } from '../../interfaces/requests/DoctorLoginRequest';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) {}

  register(data: DoctorCreateRequest) {
    const doctors = JSON.parse(localStorage.getItem('doctors') || '[]');
    doctors.push({ ...data, id: Date.now() });
    localStorage.setItem('doctors', JSON.stringify(doctors));
    return { success: true };
  }

  login(data: DoctorLoginRequest) {
    // demo hardcoded login
    if (data.email === 'admin@example.com' && data.password === 'admin') {
      const user = { id: 1, name: 'Admin User', email: 'admin' };
      localStorage.setItem('user', JSON.stringify(user));
      return { success: true, user };
    }
    return { success: false, message: 'Invalid credentials' };
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }
}
