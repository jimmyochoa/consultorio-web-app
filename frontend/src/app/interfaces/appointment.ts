import { Patient } from "./patient";

export interface Appointment {
  id: number;
  patient_id: number;
  doctor_id: number;
  start_time: string;
  end_time: string;
  reason: string;
  patient: Patient;
}