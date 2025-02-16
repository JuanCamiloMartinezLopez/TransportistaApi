import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn } from 'typeorm';
import { UsuarioModel } from './UsuarioModel';
import { DireccionModel } from './DireccionModel';
import { RutaModel } from './RutaModel';
import { EstadoEnvioModel } from './EstadoEnvioModel';
import { Direccion } from '@domain/entities/Direccion';
import { Usuario } from '@domain/entities/Usuario';

@Entity('envio')
export class EnvioModel {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  peso!: number;

  @Column({ name: 'tipo_producto' })
  tipoProducto!: string;

  @ManyToOne(() => UsuarioModel, (usuario) => usuario.envios)
  @JoinColumn({ name: 'usuario_id' })
  usuario!: UsuarioModel;

  @ManyToOne(() => DireccionModel, (direccion) => direccion.envios)
  @JoinColumn({ name: 'direccion_id' })
  direccion!: DireccionModel;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  alto!: number;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  ancho!: number;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  profundidad!: number;

  @Column({ default: true })
  activo!: boolean;

  @CreateDateColumn({ name: 'fecha_creacion', type: 'timestamp' })
  fechaCreacion!: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion', type: 'timestamp' })
  fechaModificacion!: Date;

  @ManyToOne(() => RutaModel, (ruta) => ruta.envios)
  @JoinColumn({ name: 'ruta_id' })
  ruta!: RutaModel;

  @OneToMany(() => EstadoEnvioModel, (estadoEnvio) => estadoEnvio.envio, { cascade: true })
  estados!: EstadoEnvioModel[];
}
