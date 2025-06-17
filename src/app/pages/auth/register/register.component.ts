// register.component.ts
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { ButtonComponent } from '../../../shared/button/button.component';
import { CommonModule } from '@angular/common';
import { AlertComponent } from '../../../shared/alert/alert.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent, RouterLink, AlertComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]), // No se validará
    confirmPassword: new FormControl('', [Validators.required]),
  });

  errorMessage = '';
  successMessage = '';

  constructor(private router: Router) {}

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.errorMessage = 'Completa todos los campos correctamente';
      this.successMessage = '';
      return;
    }

    const { name, email, password, confirmPassword } = this.registerForm.value;

    if (password !== confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden';
      this.successMessage = '';
      return;
    }

    const existingUser = localStorage.getItem(`user:${email}`);
    if (existingUser) {
      this.errorMessage = 'El correo ya está registrado';
      this.successMessage = '';
      return;
    }

    const userData = { name, email, password }; // ⚠️ No se guarda password
    localStorage.setItem(`user:${email}`, JSON.stringify(userData));

    this.errorMessage = '';
    this.successMessage = 'Registro exitoso';

    setTimeout(() => {
      this.router.navigate(['/auth/login']);
    }, 1500);
  }
}
