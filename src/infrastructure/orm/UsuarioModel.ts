import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('usuario')
export class UsuarioModel {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombres!: string;

  @Column()
  apellidos!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column()
  telefono!: string;

  @Column()
  direccion!: string;
}
