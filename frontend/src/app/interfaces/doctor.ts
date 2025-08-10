import { Specialty } from "./Specialty";

export interface Doctor {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  specialty?: Specialty;
}