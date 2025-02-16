import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { TransportistaModel } from './TransportistaModel';

@Entity('vehiculo')
export class VehiculoModel {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 20, unique: true })
  placa!: string;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  capacidad_volumen!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  capacidad_peso!: number;

  @ManyToOne(() => TransportistaModel, (transportista) => transportista.vehiculos)
  @JoinColumn({ name: 'transportista_id' })
  transportista!: TransportistaModel;

  @Column({ default: true })
  activo!: boolean;
  @CreateDateColumn({ name: 'fecha_creacion', type: 'timestamp' })
  fechaCreacion!: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion', type: 'timestamp' })
  fechaModificacion!: Date;
}
