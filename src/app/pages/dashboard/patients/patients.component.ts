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
  imports: [ModalComponent, PatientFormComponent, CommonModule, TableComponent, ButtonComponent],
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.css'
})
export class PatientsComponent implements OnInit {
  patients: Patient[] = [];
  showPatientModal = false;

  constructor(private patientService: PatientService) {}

  ngOnInit(): void {
    this.patientService.getPatients().subscribe(data => {
      this.patients = data;
    });
  }

  handleNewPatient(patient: Patient) {
    this.patients.push(patient);
    this.showPatientModal = false;
  }

  onEdit(patient: Patient) {
    console.log('Editar', patient);
  }

  onDelete(patient: Patient) {
    this.patients = this.patients.filter(p => p.id !== patient.id);
  }

  columns = [
    { field: 'nombres', header: 'Nombres' },
    { field: 'apellidos', header: 'Apellidos' },
    { field: 'fechaNacimiento', header: 'Nacimiento' },
    { field: 'sexo', header: 'Sexo' },
    { field: 'email', header: 'Email' },
    { field: 'celular', header: 'Celular' },
    { field: 'tipoSangre', header: 'Tipo Sangre' },
    { field: 'fechaRegistro', header: 'Registro' }
  ];
}
