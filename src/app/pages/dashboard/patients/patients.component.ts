import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { PatientFormComponent } from '../../../shared/form/patient-form/patient-form.component';

@Component({
  selector: 'app-patients',
  imports: [ModalComponent, PatientFormComponent, CommonModule],
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.css'
})
export class PatientsComponent {
  showPatientModal = false;
  
  patients = [
    { id: 1, nombres: 'Juan', apellidos: 'Pérez' },
    { id: 2, nombres: 'Ana', apellidos: 'Martínez' }
  ];

  handleNewPatient(data: any) {
    this.patients.push({ ...data, id: this.patients.length + 1 });
    this.showPatientModal = false;
  }
}
