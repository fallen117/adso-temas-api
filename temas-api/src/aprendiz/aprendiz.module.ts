import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aprendiz } from './entities/aprendiz.entity';
import { AprendizService } from './aprendiz.service';
import { AprendizController } from './aprendiz.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Aprendiz]),
  ],
  controllers: [AprendizController],
  providers: [AprendizService],
  exports: [AprendizService],
})
export class AprendizModule {}
