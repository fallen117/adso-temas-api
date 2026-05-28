export interface Aprendiz {
  id: number;
  cedula: string;
  nombreCompleto: string;
  fechaNacimiento: string;
}

export interface CreateAprendizDto {
  cedula: string;
  nombreCompleto: string;
  fechaNacimiento: string;
}

export interface UpdateAprendizDto {
  cedula?: string;
  nombreCompleto?: string;
  fechaNacimiento?: string;
}
