import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { Appointment } from '../../../../../interfaces/appointment';
import { AppointmentsService } from '../../../../../services/dashboard/appointments.service';

@Component({
  selector: 'app-appointment-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './appointment-detail.component.html',
  styleUrls: ['./appointment-detail.component.css'],
})
export class AppointmentDetailComponent implements OnInit, OnDestroy {
  appointment: Appointment | null = null;
  loading = true;
  error: string | null = null;
  private sub?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appointmentService: AppointmentsService
  ) {}

  ngOnInit(): void {
    this.sub = this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (Number.isNaN(id)) {
        this.error = 'ID inválido';
        this.loading = false;
        return;
      }

      this.loading = true;
      this.error = null;

      this.appointmentService.getAppointmentById(id).subscribe({
        next: (a) => { this.appointment = a; this.loading = false; },
        error: () => { this.error = 'Cita no encontrada'; this.loading = false; }
      });
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  goBack() {
    this.router.navigate(['/dashboard/appointments']);
  }
}
