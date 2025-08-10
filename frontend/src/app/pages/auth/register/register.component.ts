import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { ButtonComponent } from '../../../shared/button/button.component';
import { CommonModule } from '@angular/common';
import { AlertComponent } from '../../../shared/alert/alert.component';
import { SpecialtiesService } from '../../../services/specialty-areas.service';
import { Specialty } from '../../../interfaces/Specialty';
import { AuthService } from '../../../services/auth/auth.service';
import { DoctorCreateRequest } from '../../../interfaces/requests/DoctorCreateRequest';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent, RouterLink, AlertComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm = new FormGroup({
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required]),
    specialty_area_id: new FormControl('', [Validators.required]),
  });

  errorMessage = '';
  successMessage = '';
  specialties: Specialty[] = [];

  constructor(
    private router: Router,
    private specialtiesService: SpecialtiesService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.specialtiesService.getSpecialties().subscribe(data => {
      this.specialties = data;
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.errorMessage = 'Completa todos los campos correctamente';
      this.successMessage = '';
      return;
    }

    const { first_name, last_name, email, password, confirmPassword, specialty_area_id } =
      this.registerForm.value;

    if (password !== confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden';
      this.successMessage = '';
      return;
    }

    const payload: DoctorCreateRequest = {
      first_name: first_name!,
      last_name: last_name!,
      email: email!,
      password: password!,
      specialty_area_id: Number(specialty_area_id)
    };

    this.authService.register(payload).subscribe(() => {
      this.errorMessage = '';
      this.successMessage = 'Registro exitoso';
      setTimeout(() => {
        this.router.navigate(['/auth/login']);
      }, 1500);
    });
  }
}
