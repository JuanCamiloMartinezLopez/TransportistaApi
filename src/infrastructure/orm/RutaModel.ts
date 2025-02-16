// src/infrastructure/orm/RutaModel.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { TransportistaModel } from './TransportistaModel';
import { EnvioModel } from './EnvioModel';

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

  @Column({ name: 'tiempo_estimado' })
  tiempoEstimado!: number;

  @CreateDateColumn({ name: 'fecha_creacion', type: 'timestamp' })
  fechaCreacion!: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion', type: 'timestamp' })
  fecha_modificacion!: Date;

  @ManyToOne(() => TransportistaModel, (transportista) => transportista.rutas)
  @JoinColumn({ name: 'transportista_id' })
  transportista!: TransportistaModel;

  @OneToMany(() => EnvioModel, (envio) => envio.ruta)
  envios!: EnvioModel[];
}
