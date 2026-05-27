import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { TemasService } from './temas.service';
import { CreateTemaDto } from './dto/create-tema.dto';
import { UpdateTemaDto } from './dto/update-tema.dto';

/**
 * Controlador REST para el recurso "temas".
 * Base URL: /api/v1/temas
 *
 * Rutas expuestas:
 *   GET    /api/v1/temas         → Listar todos los temas
 *   GET    /api/v1/temas/:id     → Obtener un tema por ID
 *   POST   /api/v1/temas         → Crear un tema
 *   PUT    /api/v1/temas/:id     → Reemplazar un tema (update completo)
 *   PATCH  /api/v1/temas/:id     → Actualizar parcialmente un tema
 *   DELETE /api/v1/temas/:id     → Eliminar un tema
 */
@Controller('temas')
export class TemasController {
  constructor(private readonly temasService: TemasService) {}

  // ── POST /temas ───────────────────────────────────────────────────────
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createTemaDto: CreateTemaDto) {
    return this.temasService.create(createTemaDto);
  }

  // ── GET /temas ────────────────────────────────────────────────────────
  @Get()
  findAll() {
    return this.temasService.findAll();
  }

  // ── GET /temas/:id ────────────────────────────────────────────────────
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.temasService.findOne(id);
  }

  // ── PUT /temas/:id (reemplazo completo) ───────────────────────────────
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTemaDto: UpdateTemaDto,
  ) {
    return this.temasService.update(id, updateTemaDto);
  }

  // ── PATCH /temas/:id (actualización parcial) ──────────────────────────
  @Patch(':id')
  partialUpdate(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTemaDto: UpdateTemaDto,
  ) {
    return this.temasService.update(id, updateTemaDto);
  }

  // ── DELETE /temas/:id ─────────────────────────────────────────────────
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.temasService.remove(id);
  }
}
