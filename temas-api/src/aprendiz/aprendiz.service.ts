import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryFailedError } from 'typeorm';
import { Aprendiz } from './entities/aprendiz.entity';
import { CreateAprendizDto } from './dto/create-aprendiz.dto';
import { UpdateAprendizDto } from './dto/update-aprendiz.dto';

@Injectable()
export class AprendizService {
  constructor(
    @InjectRepository(Aprendiz)
    private readonly aprendizRepository: Repository<Aprendiz>,
  ) {}

  async create(createAprendizDto: CreateAprendizDto): Promise<Aprendiz> {
    const nuevoAprendiz = this.aprendizRepository.create(createAprendizDto);
    return await this.aprendizRepository.save(nuevoAprendiz);
  }

  async findAll(): Promise<Aprendiz[]> {
    return await this.aprendizRepository.find({
      order: { id: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Aprendiz> {
    const aprendiz = await this.aprendizRepository.findOne({ where: { id } });

    if (!aprendiz) {
      throw new NotFoundException(`Aprendiz con id ${id} no encontrado.`);
    }

    return aprendiz;
  }

  async update(id: number, updateAprendizDto: UpdateAprendizDto): Promise<Aprendiz> {
    const aprendiz = await this.findOne(id);

    const aprendizActualizado = this.aprendizRepository.merge(aprendiz, updateAprendizDto);
    return await this.aprendizRepository.save(aprendizActualizado);
  }

  async remove(id: number): Promise<{ message: string }> {
    await this.findOne(id);

    try {
      await this.aprendizRepository.delete(id);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        const driverError = error.driverError as any;
        if (driverError?.code === '23503') {
          throw new ConflictException(
            'No se puede eliminar el aprendiz porque tiene registros asociados a un tema',
          );
        }
      }
      throw error;
    }

    return { message: `Aprendiz con id ${id} eliminado exitosamente.` };
  }
}
