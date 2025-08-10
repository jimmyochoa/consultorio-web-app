import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { PatientFormComponent } from '../../../shared/form/patient-form/patient-form.component';
import { Patient } from '../../../interfaces/patient';
import { TableComponent } from '../../../shared/table/table.component';
import { ButtonComponent } from '../../../shared/button/button.component';
import { PatientService } from '../../../services/patient/patient.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patients',
  imports: [
    ModalComponent,
    PatientFormComponent,
    CommonModule,
    TableComponent,
    ButtonComponent,
  ],
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.css',
})
export class PatientsComponent implements OnInit {
  patients: Patient[] = [];
  showPatientModal = false;
  editingPatient: Patient | null = null;

  constructor(private patientService: PatientService, private router: Router) { }

  handleCloseModal() {
    this.showPatientModal = false;
    this.editingPatient = null;
  }

  ngOnInit(): void {
    this.patientService.getPatients().subscribe((data) => {
      this.patients = data;
    });
  }

  onRowSelected(patient: Patient) {
    this.router.navigate(['/dashboard/patients', patient.id]);
  }
  handleNewPatient(patient: Patient) {
    if (this.editingPatient) {
      const updatedPatient = { ...this.editingPatient, ...patient }; // conserva el id del original

      this.patientService.updatePatient(updatedPatient).subscribe({
        next: (res) => {
          const index = this.patients.findIndex(p => p.id === res.id);
          if (index !== -1) this.patients[index] = res;
          this.editingPatient = null;
        }
      });
    } else {
      //handle create patient
      this.patientService.createPatient(patient).subscribe({
        next: (newPatient) => {
          console.log('Paciente creado:', newPatient);
          this.patients.push(newPatient);
        },
        error: (err) => {
          console.error('Error al crear paciente:', err);
        }
      });
    }
    this.showPatientModal = false;
    this.editingPatient = null;
  }

  onDelete(patient: Patient) {
    if (
      confirm(`¿Eliminar paciente ${patient.first_name} ${patient.last_name}?`)
    ) {
      this.patientService.deletePatient(patient.id).subscribe({
        next: () => {
          this.patients = this.patients.filter(p => p.id !== patient.id);
        },
      });
    }
  }

  onEdit(patient: Patient) {
    this.editingPatient = { ...patient };
    this.showPatientModal = true;
  }

  columns = [
    { field: 'first_name', header: 'Nombres' },
    { field: 'last_name', header: 'Apellidos' },
    { field: 'gender', header: 'Sexo' },
    { field: 'email', header: 'Email' },
  ];
}
