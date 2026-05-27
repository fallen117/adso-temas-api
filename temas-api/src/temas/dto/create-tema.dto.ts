import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class CreateTemaDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(255)
  nombreTema: string;
}
