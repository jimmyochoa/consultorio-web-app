import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { AppointmentFormComponent } from '../../../shared/form/appointment-form/appointment-form.component';
import { AppointmentsService } from '../../../services/dashboard/appointments.service';
import { Patient } from '../../../interfaces/patient';
import { Appointment } from '../../../interfaces/appointment';
import { TableComponent } from '../../../shared/table/table.component';
import { ButtonComponent } from "../../../shared/button/button.component";
import { PatientService } from '../../../services/patient/patient.service';
import { Router } from '@angular/router';


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
    private router: Router,
    private appointmentService: AppointmentsService,
    private patientService: PatientService
  ) { }

  onRowSelected(appointment: Appointment) {
    this.router.navigate(['/dashboard/appointments', appointment.id]);
  }

  ngOnInit(): void {
    this.patientService.getPatients().subscribe(data => {
      this.patients = data;
    });

    this.appointmentService.getAppointments().subscribe(data => {
      this.appointments = data.map(a => ({
        ...a,
        fullName: `${a.patient.first_name} ${a.patient.last_name}`
      }));
    });
  }

  openNewAppointmentModal() {
    this.selectedAppointment = null;
    this.showAppointmentModal = true;
  }

  handleSaveAppointment(data: Appointment) {
    const pacienteIdNum =
      typeof data.patient_id === 'string'
        ? parseInt(data.patient_id, 10)
        : data.patient_id;

    // Validar conflicto de cita
    const conflict = this.appointments.some(
      app => app.start_time === data.start_time && app.id !== data.id
    );
    if (conflict) {
      alert('Ya existe una cita en esa fecha y hora.');
      return;
    }

    // Buscar paciente
    const paciente = this.patients.find(p => p.id === pacienteIdNum);
    if (!paciente) {
      alert('Paciente no encontrado.');
      return;
    }

    // Actualizar nombre completo
    data.patient = {
      ...paciente,
      first_name: `${paciente.first_name} ${paciente.last_name}`
    };

    if (this.selectedAppointment) {
      // ---- EDITAR ----
      const updatedAppointment = {
        ...data,
        id: this.selectedAppointment.id // conservar ID
      };

      this.appointmentService.updateAppointment(updatedAppointment).subscribe({
        next: (updated) => {
          // Buscar paciente para mostrar nombre completo
          const paciente = this.patients.find(p => p.id === updated.patient_id) || updated.patient;

          const display = {
            ...updated,
            patient: paciente,
            fullName: `${paciente.first_name} ${paciente.last_name}`
          } as any;

          const index = this.appointments.findIndex(a => a.id === updated.id);
          if (index !== -1) {
            this.appointments[index] = display;
          }

          this.showAppointmentModal = false;
          this.selectedAppointment = null;
        },
        error: (err) => console.error('Error al actualizar cita:', err)
      });
    }
    else {
      // ---- CREAR ----
      const newAppointment = { ...data };
      this.appointmentService.createAppointment(newAppointment).subscribe({
        next: created => {
          const paciente = this.patients.find(p => p.id === pacienteIdNum)!;
          this.appointments.push({
            ...(created as any),
            fullName: `${paciente.first_name} ${paciente.last_name}`
          } as any);

          this.showAppointmentModal = false;
        },
        error: err => console.error('Error al crear cita:', err)
      });

    }
  }


  onEdit(appointment: Appointment) {
    const formatDateForInput = (isoString: string) => {
      if (!isoString) return '';
      const date = new Date(isoString);
      const tzOffset = date.getTimezoneOffset() * 60000; // Ajuste por zona horaria
      return new Date(date.getTime() - tzOffset).toISOString().slice(0, 16);
    };

    this.selectedAppointment = {
      ...appointment,
      start_time: formatDateForInput(appointment.start_time),
      end_time: formatDateForInput(appointment.end_time)
    };

    this.showAppointmentModal = true;
  }

  onDelete(appointment: Appointment) {
    if (confirm(`¿Seguro que deseas eliminar la cita de ${appointment.patient.first_name} el ${appointment.start_time}?`)) {
      this.appointmentService.deleteAppointment(appointment.id).subscribe({
        next: () => {
          this.appointments = this.appointments.filter(a => a.id !== appointment.id);
        },
        error: err => console.error('Error al eliminar cita:', err)
      });
    }
  }

  columns = [
    { field: 'fullName', header: 'Paciente' },
    { field: 'start_time', header: 'Fecha y hora de inicio' },
    { field: 'end_time', header: 'Fecha y hora de fin' },
    { field: 'reason', header: 'Motivo de la cita' }
  ];
}