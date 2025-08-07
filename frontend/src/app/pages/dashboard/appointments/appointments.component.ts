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

  selectedAppointment: Appointment | null = null;

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

  openNewAppointmentModal() {
    this.selectedAppointment = null;
    this.showAppointmentModal = true;
  }

  handleSaveAppointment(data: Appointment) {
  const pacienteIdNum = typeof data.pacienteId === 'string' ? parseInt(data.pacienteId, 10) : data.pacienteId;

  // Validar conflicto de cita
  const conflict = this.appointments.some(app =>
    app.fechaHora === data.fechaHora &&
    app.id !== data.id
  );

  if (conflict) {
    alert('Ya existe una cita en esa fecha y hora. Por favor seleccione otro horario.');
    return;
  }

  // Buscar paciente actualizado
  const paciente = this.patients.find(p => p.id === pacienteIdNum);

  if (!paciente) {
    alert('Paciente no encontrado. Por favor seleccione un paciente válido.');
    return;
  }

  data.pacienteId = pacienteIdNum;
  data.pacienteNombre = `${paciente.nombres} ${paciente.apellidos}`;

  if (data.id) {
    // Editar cita
    const index = this.appointments.findIndex(a => a.id === data.id);
    if (index !== -1) {
      this.appointments[index] = data;
    }
  } else {
    // Nueva cita
    const maxId = this.appointments.length > 0 ? Math.max(...this.appointments.map(a => a.id)) : 0;
    data.id = maxId + 1;
    this.appointments.push(data);
  }

  this.showAppointmentModal = false;
  this.selectedAppointment = null;
  }



  onEdit(appointment: Appointment) {
    this.selectedAppointment = { ...appointment };
    this.showAppointmentModal = true;
  }

  onDelete(appointment: Appointment) {
    if (confirm(`¿Seguro que deseas eliminar la cita de ${appointment.pacienteNombre} el ${appointment.fechaHora}?`)) {
      this.appointments = this.appointments.filter(a => a.id !== appointment.id);
    }
  }

  columns = [
    { field: 'pacienteNombre', header: 'Paciente' },
    { field: 'fechaHora', header: 'Fecha y hora' },
    { field: 'razon', header: 'Motivo de la cita' }
  ];
}