export interface Prescription {
  id: number;
  appointment_id: number;
  medication_details: string;
  instructions: string;
  precautions: string;
}