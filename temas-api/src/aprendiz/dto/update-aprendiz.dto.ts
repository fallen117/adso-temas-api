import { PartialType } from '@nestjs/mapped-types';
import { CreateAprendizDto } from './create-aprendiz.dto';

export class UpdateAprendizDto extends PartialType(CreateAprendizDto) {}
