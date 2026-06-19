import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tema } from './entities/tema.entity';
import { TemasService } from './temas.service';
import { TemasController } from './temas.controller';
import { GeminiService } from './gemini.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tema]),
  ],
  controllers: [TemasController],
  providers: [TemasService, GeminiService],
  exports: [TemasService],
})
export class TemasModule {}
