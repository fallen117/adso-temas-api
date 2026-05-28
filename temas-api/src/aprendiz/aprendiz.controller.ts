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
import { AprendizService } from './aprendiz.service';
import { CreateAprendizDto } from './dto/create-aprendiz.dto';
import { UpdateAprendizDto } from './dto/update-aprendiz.dto';

@Controller('aprendices')
export class AprendizController {
  constructor(private readonly aprendizService: AprendizService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createAprendizDto: CreateAprendizDto) {
    return this.aprendizService.create(createAprendizDto);
  }

  @Get()
  findAll() {
    return this.aprendizService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.aprendizService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAprendizDto: UpdateAprendizDto,
  ) {
    return this.aprendizService.update(id, updateAprendizDto);
  }

  @Patch(':id')
  partialUpdate(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAprendizDto: UpdateAprendizDto,
  ) {
    return this.aprendizService.update(id, updateAprendizDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.aprendizService.remove(id);
  }
}
