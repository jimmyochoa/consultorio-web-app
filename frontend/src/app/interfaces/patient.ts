export interface Patient {
  id: number;
  first_name: string;
  last_name: string;
  birth_date: string;
  gender: 'MASCULINO' | 'FEMENINO';
  email: string;
  phone: string;
  blood_type: string;
  created_at: string;
}