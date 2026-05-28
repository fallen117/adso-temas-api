import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class CreateAprendizDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(20)
  cedula: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(255)
  nombreCompleto: string;

  @IsString()
  @IsNotEmpty()
  fechaNacimiento: string;
}
