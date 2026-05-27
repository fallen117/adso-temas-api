export interface Tema {
  id: number;
  nombreTema: string;
}

export interface CreateTemaDto {
  nombreTema: string;
}

export interface UpdateTemaDto {
  nombreTema?: string;
}
