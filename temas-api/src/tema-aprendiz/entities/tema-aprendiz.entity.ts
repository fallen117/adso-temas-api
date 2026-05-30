import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Aprendiz } from '../../aprendiz/entities/aprendiz.entity';
import { Tema } from '../../temas/entities/tema.entity';

@Entity({ name: 'tema_aprendiz', schema: 'sena' })
export class TemaAprendiz {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ name: 'id_aprendiz', type: 'bigint', nullable: true })
  idAprendiz: number;

  @Column({ name: 'id_tema', type: 'bigint', nullable: true })
  idTema: number;

  @ManyToOne(() => Aprendiz)
  @JoinColumn({ name: 'id_aprendiz' })
  aprendiz: Aprendiz;

  @ManyToOne(() => Tema)
  @JoinColumn({ name: 'id_tema' })
  tema: Tema;
}
