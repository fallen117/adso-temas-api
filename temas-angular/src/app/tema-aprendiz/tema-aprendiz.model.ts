export interface TemaAprendiz {
  id: number;
  idAprendiz: number;
  idTema: number;
  aprendiz?: { id: number; nombreCompleto: string };
  tema?: { id: number; nombreTema: string };
}

export interface CreateTemaAprendizDto {
  idAprendiz: number;
  idTema: number;
}
