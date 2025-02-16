import { Direccion } from '@domain/entities/Direccion';

export interface DireccionRepository {
  create(direccion: Direccion): Promise<Direccion>;
}
