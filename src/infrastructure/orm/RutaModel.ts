// src/infrastructure/orm/RutaModel.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { TransportistaModel } from './TransportistaModel';
import { EnvioModel } from './EnvioModel';
import { EstadosRuta } from '@constants/estadosRuta';

@Entity('ruta')
export class RutaModel {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column()
  origen!: string;

  @Column()
  destino!: string;

  @Column({ name: 'estado_ruta', type: 'enum', enum: EstadosRuta, default: EstadosRuta.GESTION })
  estadoRuta!: EstadosRuta;

  @Column({ default: true })
  activo!: boolean;

  @CreateDateColumn({ name: 'fecha_creacion', type: 'timestamp' })
  fechaCreacion!: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion', type: 'timestamp' })
  fecha_modificacion!: Date;

  @ManyToOne(() => TransportistaModel, (transportista) => transportista.rutas)
  @JoinColumn({ name: 'transportista_id' })
  transportista!: TransportistaModel;

  @OneToMany(() => EnvioModel, (envio) => envio.ruta, { cascade: true })
  envios!: EnvioModel[];
}
