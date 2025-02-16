import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { EnvioModel } from './EnvioModel';

@Entity('usuario')
export class UsuarioModel {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombres!: string;

  @Column()
  apellidos!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column()
  telefono!: string;

  @Column()
  roles!: string;

  @Column({ default: true })
  activo!: boolean;

  @OneToMany(() => EnvioModel, (envio) => envio.usuario)
  envios!: EnvioModel[];

  @CreateDateColumn({ name: 'fecha_creacion', type: 'timestamp' })
  fechaCreacion!: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion', type: 'timestamp' })
  fechaModificacion!: Date;
}
