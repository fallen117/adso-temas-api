import { IsInt, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTemaAprendizDto {
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  idAprendiz: number;

  @Type(() => Number)
  @IsInt()
  @IsPositive()
  idTema: number;
}
