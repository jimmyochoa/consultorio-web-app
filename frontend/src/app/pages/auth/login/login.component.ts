import { Component } from '@angular/core';
import { ButtonComponent } from '../../../shared/button/button.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AlertComponent } from '../../../shared/alert/alert.component';
import { AuthService } from '../../../services/auth/auth.service';
import { DoctorLoginRequest } from '../../../interfaces/requests/DoctorLoginRequest';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ButtonComponent, ReactiveFormsModule, CommonModule, RouterLink, AlertComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  errorMessage = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Por favor completa todos los campos correctamente';
      return;
    }

    const payload: DoctorLoginRequest = {
      email: this.loginForm.get('email')!.value!,
      password: this.loginForm.get('password')!.value!
    };

    this.authService.login(payload).subscribe({
      next: (res: any) => {
        var cachedData = { id: res.id }

        localStorage.setItem('user', JSON.stringify(cachedData));

        this.errorMessage = '';
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Credenciales incorrectas';
      }
    });
  }

}
