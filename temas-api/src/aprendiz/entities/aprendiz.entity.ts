import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity({ name: 'aprendiz', schema: 'sena' })
export class Aprendiz {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ name: 'cedula', type: 'varchar', nullable: false, unique: true })
  cedula: string;

  @Column({ name: 'nombre_completo', type: 'varchar', nullable: false })
  nombreCompleto: string;

  @Column({ name: 'fecha_nacimiento', type: 'date', nullable: false })
  fechaNacimiento: string;
}
