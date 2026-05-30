import { PartialType } from '@nestjs/mapped-types';
import { CreateTemaAprendizDto } from './create-tema-aprendiz.dto';

export class UpdateTemaAprendizDto extends PartialType(CreateTemaAprendizDto) {}
