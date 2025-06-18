export interface Patient {
  id: number;
  nombres: string;
  apellidos: string;
  fechaNacimiento: string; 
  sexo: 'Masculino' | 'Femenino' ;
  email: string;
  celular: string;
  tipoSangre: string; 
  fechaRegistro: string; 
}