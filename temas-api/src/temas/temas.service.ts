import {
  Injectable,
  NotFoundException,
  ConflictException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryFailedError } from 'typeorm';
import { Tema } from './entities/tema.entity';
import { CreateTemaDto } from './dto/create-tema.dto';
import { UpdateTemaDto } from './dto/update-tema.dto';
import { GeminiService } from './gemini.service';

@Injectable()
export class TemasService {
  private readonly logger = new Logger(TemasService.name);

  constructor(
    @InjectRepository(Tema)
    private readonly temaRepository: Repository<Tema>,
    private readonly geminiService: GeminiService,
  ) {}

  // ── CREATE ────────────────────────────────────────────────────────────
  async create(createTemaDto: CreateTemaDto): Promise<Tema> {
    const existente = await this.temaRepository.findOne({
      where: { nombreTema: createTemaDto.nombreTema },
    });

    if (existente) {
      throw new ConflictException(
        'Ya existe un tema con ese nombre.',
      );
    }

    const nuevoTema = this.temaRepository.create(createTemaDto);
    const temaGuardado = await this.temaRepository.save(nuevoTema);

    try {
      const tips = await this.geminiService.generarTips(createTemaDto.nombreTema);
      temaGuardado.tips = tips;
      return await this.temaRepository.save(temaGuardado);
    } catch (error) {
      this.logger.warn(`Tema creado pero no se pudieron generar tips: ${error.message}`);
      return temaGuardado;
    }
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
    const tema = await this.findOne(id);

    if (updateTemaDto.nombreTema !== undefined) {
      const existente = await this.temaRepository.findOne({
        where: { nombreTema: updateTemaDto.nombreTema },
      });

      if (existente && existente.id !== id) {
        throw new ConflictException(
          'Ya existe otro tema con ese nombre.',
        );
      }
    }

    const temaActualizado = this.temaRepository.merge(tema, updateTemaDto);
    return await this.temaRepository.save(temaActualizado);
  }

  // ── DELETE ────────────────────────────────────────────────────────────
  async remove(id: number): Promise<{ message: string }> {
    await this.findOne(id);

    try {
      await this.temaRepository.delete(id);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        const driverError = error.driverError as any;
        if (driverError?.code === '23503') {
          throw new ConflictException(
            'No se puede eliminar el tema porque tiene registros asociados a un aprendiz.',
          );
        }
      }
      throw error;
    }

    return { message: `Tema con id ${id} eliminado exitosamente.` };
  }
}
