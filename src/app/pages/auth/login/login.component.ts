import { Component } from '@angular/core';
import { ButtonComponent } from '../../../shared/button/button.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AlertComponent } from '../../../shared/alert/alert.component';

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

  constructor(private router: Router) { }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Por favor completa todos los campos correctamente';
      return;
    }

    const email = this.loginForm.get('email')!.value!;
    const password = this.loginForm.get('password')!.value!;
    const userData = localStorage.getItem(`user:${email}`);
    if (!userData) {
      this.errorMessage = 'Usuario no encontrado';
      return;
    }

    const user = JSON.parse(userData);
    if (user.password === password) {
      localStorage.setItem('currentUser', userData);
      this.errorMessage = '';
      this.router.navigate(['/dashboard']);
    } else {
      this.errorMessage = 'Contraseña incorrecta';
    }

  }
}
