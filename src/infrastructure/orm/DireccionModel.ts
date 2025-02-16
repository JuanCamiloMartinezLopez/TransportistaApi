// src/infrastructure/orm/DireccionModel.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Ciudades } from '@constants/ciudades';
import { Departamentos } from '@constants/departamentos';
import { EnvioModel } from './EnvioModel';

@Entity('direccion')
export class DireccionModel {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'text', nullable: false })
  direccion!: string; // Dirección completa (ej. Calle 45 #23-10, Apt 301)

  @Column({ type: 'text', nullable: false })
  barrio!: string; // Nombre del barrio

  @Column({ name: 'codigo_postal', length: 10, nullable: true })
  codigoPostal?: string;

  @Column({
    type: 'enum',
    enum: Ciudades,
    default: Ciudades.OTRO
  })
  ciudad!: Ciudades;

  @Column({
    type: 'enum',
    enum: Departamentos,
    default: Departamentos.OTRO
  })
  departamento!: Departamentos;

  @OneToMany(() => EnvioModel, (envio) => envio.direccion, { cascade: true })
  envios!: EnvioModel[];

  @Column({ default: true })
  activo!: boolean;

  @CreateDateColumn({ name: 'fecha_creacion', type: 'timestamp' })
  fechaCreacion!: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion', type: 'timestamp' })
  fechaModificacion!: Date;
}
