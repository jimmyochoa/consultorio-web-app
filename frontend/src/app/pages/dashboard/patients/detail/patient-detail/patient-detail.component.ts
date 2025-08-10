import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { Patient } from '../../../../../interfaces/patient';
import { PatientService } from '../../../../../services/patient/patient.service';

@Component({
  selector: 'app-patient-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.css'],
})
export class PatientDetailComponent implements OnInit, OnDestroy {
  patient: Patient | null = null;
  loading = true;
  error: string | null = null;

  private sub?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private patientService: PatientService
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

      this.patientService.getPatientById(id).subscribe({
        next: (p) => { this.patient = p; this.loading = false; },
        error: () => { this.error = 'Paciente no encontrado'; this.loading = false; }
      });
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  goBack() { this.router.navigate(['/dashboard/patients']); }

  edit() {
    if (this.patient) {
      this.router.navigate(['/dashboard/patients'], { queryParams: { edit: this.patient.id } });
    }
  }
}
