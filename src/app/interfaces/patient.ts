export interface Patient {
  id: number;
  nombres: string;
  apellidos: string;
  fechaNacimiento: string; 
  sexo: 'Masculino' | 'Femenino' | 'Otro';
  email: string;
  celular: string;
  tipoSangre: string; 
  fechaRegistro: string; 
}