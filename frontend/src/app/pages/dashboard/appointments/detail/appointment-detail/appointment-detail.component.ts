import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { Appointment } from '../../../../../interfaces/appointment';
import { AppointmentsService } from '../../../../../services/dashboard/appointments.service';
import { Prescription } from '../../../../../interfaces/prescription';
import { PrescriptionService } from '../../../../../services/prescription/prescription.service';
import { PrescriptionFormComponent } from '../../../../../shared/form/prescription-form/prescription-form.component';

@Component({
  selector: 'app-appointment-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, PrescriptionFormComponent],
  templateUrl: './appointment-detail.component.html',
  styleUrls: ['./appointment-detail.component.css'],
})
export class AppointmentDetailComponent implements OnInit, OnDestroy {
  appointment: Appointment | null = null;
  loading = true;
  error: string | null = null;
  showPrescriptionForm = false;
  editingPrescription: Prescription | null = null;
  private sub?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appointmentService: AppointmentsService,
    private prescriptionService: PrescriptionService
  ) {}

  ngOnInit(): void {
    this.sub = this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      if (Number.isNaN(id)) {
        this.error = 'ID inválido';
        this.loading = false;
        return;
      }

      this.loading = true;
      this.error = null;

      this.appointmentService.getAppointmentById(id).subscribe({
        next: (a) => {
          this.appointment = a;
          this.loading = false;
        },
        error: () => {
          this.error = 'Cita no encontrada';
          this.loading = false;
        },
      });
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  goBack() {
    this.router.navigate(['/dashboard/appointments']);
  }

  openPrescriptionForm() {
    if (this.appointment?.prescription) {
      this.editingPrescription = { ...this.appointment.prescription };
    } else {
      this.editingPrescription = null;
    }
    this.showPrescriptionForm = true;
  }

  closePrescriptionForm() {
    this.showPrescriptionForm = false;
    this.editingPrescription = null;
  }

  savePrescription(prescriptionData: Partial<Prescription>) {
    if (!this.appointment) return;

    if (this.appointment.prescription) {
      // Actualizar prescripción
      const updatedPrescription: Prescription = {
        ...this.appointment.prescription,
        ...prescriptionData,
      };
      this.prescriptionService
        .updatePrescription(updatedPrescription)
        .subscribe({
          next: (updated) => {
            this.appointment!.prescription = updated;
            this.closePrescriptionForm();
          },
          error: (err) => {
            console.error('Error al actualizar prescripción:', err);
          },
        });
    } else {
      // Crear prescripción nueva
      const newPrescription: Partial<Prescription> = {
        appointment_id: this.appointment.id,
        ...prescriptionData,
      };
      this.prescriptionService.createPrescription(newPrescription).subscribe({
        next: (created) => {
          this.appointment!.prescription = created;
          this.closePrescriptionForm();
        },
        error: (err) => {
          console.error('Error al crear prescripción:', err);
        },
      });
    }
  }

  onDelete() {
    if (!this.appointment || !this.appointment.prescription) return;

    if (confirm('¿Estás seguro de que deseas eliminar esta prescripción?')) {
      this.prescriptionService
        .deletePrescription(this.appointment.prescription.id)
        .subscribe({
          next: () => {
            this.appointment!.prescription = null;
            this.closePrescriptionForm();
          },
          error: (err) => {
            console.error('Error al eliminar prescripción:', err);
          },
        });
    }
  }
}
