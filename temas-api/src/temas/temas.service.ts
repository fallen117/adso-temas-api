import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tema } from './entities/tema.entity';
import { CreateTemaDto } from './dto/create-tema.dto';
import { UpdateTemaDto } from './dto/update-tema.dto';

@Injectable()
export class TemasService {
  constructor(
    // TypeORM inyecta el repositorio de la entidad Tema
    @InjectRepository(Tema)
    private readonly temaRepository: Repository<Tema>,
  ) {}

  // ── CREATE ────────────────────────────────────────────────────────────
  async create(createTemaDto: CreateTemaDto): Promise<Tema> {
    const nuevoTema = this.temaRepository.create(createTemaDto);
    return await this.temaRepository.save(nuevoTema);
  }

  // ── READ ALL ──────────────────────────────────────────────────────────
  async findAll(): Promise<Tema[]> {
    return await this.temaRepository.find({
      order: { id: 'ASC' },
    });
  }

  // ── READ ONE ──────────────────────────────────────────────────────────
  async findOne(id: number): Promise<Tema> {
    const tema = await this.temaRepository.findOne({ where: { id } });

    if (!tema) {
      throw new NotFoundException(`Tema con id ${id} no encontrado.`);
    }

    return tema;
  }

  // ── UPDATE ────────────────────────────────────────────────────────────
  async update(id: number, updateTemaDto: UpdateTemaDto): Promise<Tema> {
    // Verificamos que exista antes de actualizar
    const tema = await this.findOne(id);

    // merge aplica solo los campos que vienen en el DTO
    const temaActualizado = this.temaRepository.merge(tema, updateTemaDto);
    return await this.temaRepository.save(temaActualizado);
  }

  // ── DELETE ────────────────────────────────────────────────────────────
  async remove(id: number): Promise<{ message: string }> {
    // Verificamos que exista antes de eliminar
    await this.findOne(id);

    await this.temaRepository.delete(id);

    return { message: `Tema con id ${id} eliminado exitosamente.` };
  }
}
