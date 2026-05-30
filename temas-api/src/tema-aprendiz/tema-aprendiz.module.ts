import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemaAprendiz } from './entities/tema-aprendiz.entity';
import { TemaAprendizService } from './tema-aprendiz.service';
import { TemaAprendizController } from './tema-aprendiz.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TemaAprendiz])],
  controllers: [TemaAprendizController],
  providers: [TemaAprendizService],
  exports: [TemaAprendizService],
})
export class TemaAprendizModule {}
