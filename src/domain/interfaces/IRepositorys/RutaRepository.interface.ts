import { Ruta } from '@domain/entities/Ruta';

export interface RutaRepository {
  create(ruta: Ruta): Promise<Ruta>;
  findById(id: number): Promise<Ruta | null>;
}
