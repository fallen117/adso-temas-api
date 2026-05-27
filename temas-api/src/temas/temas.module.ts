import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tema } from './entities/tema.entity';
import { TemasService } from './temas.service';
import { TemasController } from './temas.controller';

@Module({
  imports: [
    // Registra el repositorio de Tema para poder inyectarlo con @InjectRepository
    TypeOrmModule.forFeature([Tema]),
  ],
  controllers: [TemasController],
  providers: [TemasService],
  exports: [TemasService], // exportado por si otro módulo lo necesita en el futuro
})
export class TemasModule {}
