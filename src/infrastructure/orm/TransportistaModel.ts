// src/infrastructure/orm/TransportistaModel.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { RutaModel } from './RutaModel';
import { VehiculoModel } from './VehiculoModel';

@Entity('transportista')
export class TransportistaModel {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column({ length: 20 })
  telefono!: string;

  @Column({ unique: true })
  correo!: string;

  @CreateDateColumn({ name: 'fecha_creacion', type: 'timestamp' })
  fechaCreacion!: Date;

  @Column({ name: 'fecha_modificacion', type: 'timestamp' })
  fechaModificacion!: Date;

  @OneToMany(() => RutaModel, (ruta) => ruta.transportista)
  rutas!: RutaModel[];

  @OneToMany(() => VehiculoModel, (vehiculo) => vehiculo.transportista)
  vehiculos!: VehiculoModel[];

  @Column({ default: true })
  activo!: boolean;
}
