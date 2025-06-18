import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { AppointmentFormComponent } from '../../../shared/form/appointment-form/appointment-form.component';
import { AppointmentsService } from '../../../services/dashboard/appointments.service';
import { PatientService } from '../../../services/dashboard/patient.service';
import { Patient } from '../../../interfaces/patient';
import { Appointment } from '../../../interfaces/appointment';
import { TableComponent } from '../../../shared/table/table.component';
import { ButtonComponent } from "../../../shared/button/button.component";


@Component({
  selector: 'app-appointments',
  imports: [CommonModule, ModalComponent, AppointmentFormComponent, TableComponent, ButtonComponent],
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.css'
})
export class AppointmentsComponent implements OnInit {
  showAppointmentModal = false;

  patients: Patient[] = [];
  appointments: Appointment[] = [];

  constructor(
    private appointmentService: AppointmentsService,
    private patientService: PatientService
  ) {}

  ngOnInit(): void {
    this.patientService.getPatients().subscribe(data => {
      this.patients = data;
    });

    this.appointmentService.getAppointments().subscribe(data => {
      this.appointments = data;
    });
  }

  handleNewAppointment(data: Appointment) {
    this.appointments.push(data);
    this.showAppointmentModal = false;
  }

  onEdit(app: Appointment) {
    console.log('Editar cita', app);
  }

  onDelete(app: Appointment) {
    this.appointments = this.appointments.filter(a => a.id !== app.id);
  }

  columns = [
    { field: 'pacienteNombre', header: 'Paciente' },
    { field: 'fechaHora', header: 'Fecha y hora' },
    { field: 'razon', header: 'Motivo de la cita' }
  ];
}