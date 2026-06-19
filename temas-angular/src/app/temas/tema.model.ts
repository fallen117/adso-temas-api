export interface Tip {
  tip: string;
  detalle: string;
}

export interface Tema {
  id: number;
  nombreTema: string;
  tips?: Tip[];
}

export interface CreateTemaDto {
  nombreTema: string;
}

export interface UpdateTemaDto {
  nombreTema?: string;
}
