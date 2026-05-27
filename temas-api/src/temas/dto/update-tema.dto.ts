import { PartialType } from '@nestjs/mapped-types';
import { CreateTemaDto } from './create-tema.dto';

/**
 * DTO para actualizar un tema.
 * PartialType hace que todos los campos de CreateTemaDto sean opcionales,
 * pero mantiene las mismas validaciones cuando sí se envían.
 */
export class UpdateTemaDto extends PartialType(CreateTemaDto) {}
