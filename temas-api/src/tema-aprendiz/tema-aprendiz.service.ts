import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryFailedError } from 'typeorm';
import { TemaAprendiz } from './entities/tema-aprendiz.entity';
import { CreateTemaAprendizDto } from './dto/create-tema-aprendiz.dto';
import { UpdateTemaAprendizDto } from './dto/update-tema-aprendiz.dto';

@Injectable()
export class TemaAprendizService {
  constructor(
    @InjectRepository(TemaAprendiz)
    private readonly repo: Repository<TemaAprendiz>,
  ) {}

  async create(dto: CreateTemaAprendizDto): Promise<TemaAprendiz> {
    const duplicado = await this.repo.findOne({
      where: {
        idAprendiz: dto.idAprendiz,
        idTema: dto.idTema,
      },
    });

    if (duplicado) {
      throw new ConflictException(
        'El aprendiz ya tiene asignado este tema.',
      );
    }

    const entity = this.repo.create(dto);
    return await this.repo.save(entity);
  }

  async findAll(): Promise<TemaAprendiz[]> {
    return await this.repo.find({
      relations: ['aprendiz', 'tema'],
      order: { id: 'ASC' },
    });
  }

  async findOne(id: number): Promise<TemaAprendiz> {
    const entity = await this.repo.findOne({
      where: { id },
      relations: ['aprendiz', 'tema'],
    });

    if (!entity) {
      throw new NotFoundException(`Asignacion con id ${id} no encontrada.`);
    }

    return entity;
  }

  async update(id: number, dto: UpdateTemaAprendizDto): Promise<TemaAprendiz> {
    const entity = await this.findOne(id);

    if (dto.idAprendiz !== undefined && dto.idTema !== undefined) {
      const duplicado = await this.repo.findOne({
        where: {
          idAprendiz: dto.idAprendiz,
          idTema: dto.idTema,
        },
      });

      if (duplicado && duplicado.id !== id) {
        throw new ConflictException(
          'El aprendiz ya tiene asignado este tema.',
        );
      }
    }

    const updated = this.repo.merge(entity, dto);
    return await this.repo.save(updated);
  }

  async remove(id: number): Promise<{ message: string }> {
    await this.findOne(id);

    try {
      await this.repo.delete(id);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        const driverError = error.driverError as any;
        if (driverError?.code === '23503') {
          throw new ConflictException(
            'No se puede eliminar la asignacion porque tiene registros asociados.',
          );
        }
      }
      throw error;
    }

    return { message: `Asignacion con id ${id} eliminada exitosamente.` };
  }
}
