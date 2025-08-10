export interface DoctorCreateRequest {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  specialty_area_id: number;
}
