import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { EnvioModel } from './EnvioModel';
import { EstadosEnvio } from '@constants/estadosEnvio';

@Entity('estado_envio')
export class EstadoEnvioModel {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => EnvioModel, (envio) => envio.estados)
  @JoinColumn({ name: 'envio_id' })
  envio!: EnvioModel;

  @Column({
    type: 'enum',
    enum: EstadosEnvio,
    default: 'En espera'
  })
  estado!: string;

  @Column({ default: true })
  activo!: boolean;

  @CreateDateColumn({ name: 'fecha_creacion', type: 'timestamp' })
  fechaCreacion!: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion', type: 'timestamp' })
  fechaModificacion!: Date;
}
