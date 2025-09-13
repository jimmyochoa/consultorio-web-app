import { Component } from '@angular/core';
import { MetricsService } from '../../../services/metric/metric.service';
import { MetricsData } from '../../../interfaces/metric';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-metrics',
  standalone: true, // 👈 faltaba esto
  imports: [CommonModule],
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.css'], // 👈 corregido plural
})
export class MetricsComponent {
  metrics: MetricsData | null = null;
  loading = true;
  error: string | null = null;

  constructor(private metricsService: MetricsService) {}

  ngOnInit(): void {
    this.metricsService.getMetrics().subscribe({
      next: (data) => {
        this.metrics = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Error al cargar métricas';
        this.loading = false;
      },
    });
  }
}
