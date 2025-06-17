import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { AppointmentFormComponent } from '../../../shared/form/appointment-form/appointment-form.component';


@Component({
  selector: 'app-appointments',
  imports: [CommonModule, ModalComponent, AppointmentFormComponent],
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.css'
})
export class AppointmentsComponent {
  showAppointmentModal = false;

  patients = [
    { id: 1, nombres: 'Juan', apellidos: 'Pérez' },
    { id: 2, nombres: 'Ana', apellidos: 'Martínez' }
  ];

  handleNewAppointment(data: any) {
    console.log('Nueva cita:', data);
    this.showAppointmentModal = false;
  }
}
