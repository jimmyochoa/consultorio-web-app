import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { PatientFormComponent } from '../../../shared/form/patient-form/patient-form.component';
import { PatientService } from '../../../services/dashboard/patient.service';
import { Patient } from '../../../interfaces/patient';
import { TableComponent } from '../../../shared/table/table.component';
import { ButtonComponent } from '../../../shared/button/button.component';

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

  constructor(private patientService: PatientService) {}

  handleCloseModal() {
    this.showPatientModal = false;
    this.editingPatient = null;
  }

  ngOnInit(): void {
    this.patientService.getPatients().subscribe((data) => {
      this.patients = data;
    });
  }

  handleNewPatient(patient: Patient) {
    if (this.editingPatient) {
      // Editar paciente
      this.patientService.updatePatient({ ...this.editingPatient, ...patient });
    } else {
      // Nuevo paciente: asigna nuevo id manualmente
      const newId =
        this.patients.length > 0
          ? Math.max(...this.patients.map((p) => p.id)) + 1
          : 1;
      this.patientService.addPatient({ ...patient, id: newId });
    }
    this.showPatientModal = false;
    this.editingPatient = null;
  }

  onDelete(patient: Patient) {
    if (
      confirm(`¿Eliminar paciente ${patient.nombres} ${patient.apellidos}?`)
    ) {
      this.patientService.deletePatient(patient.id);
    }
  }

  onEdit(patient: Patient) {
    this.editingPatient = { ...patient };
    this.showPatientModal = true;
  }

  columns = [
    { field: 'nombres', header: 'Nombres' },
    { field: 'apellidos', header: 'Apellidos' },
    { field: 'fechaNacimiento', header: 'Nacimiento' },
    { field: 'sexo', header: 'Sexo' },
    { field: 'email', header: 'Email' },
    { field: 'celular', header: 'Celular' },
    { field: 'tipoSangre', header: 'Tipo Sangre' },
    { field: 'fechaRegistro', header: 'Registro' },
  ];
}
