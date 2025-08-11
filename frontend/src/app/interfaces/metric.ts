export interface DoctorSpecialtyCount {
  specialty: string;
  count: number;
}

export interface MetricsData {
  doctorName: string;
  specialtyArea: string;
  totalDoctors: number;
  totalPatients: number;
  doctorsBySpecialty: DoctorSpecialtyCount[];
  pastAppointments: number;
  upcomingAppointments: number;
}
