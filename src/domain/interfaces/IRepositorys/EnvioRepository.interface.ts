import { Envio } from '@domain/entities/Envio';

export interface EnvioRepository {
  create(envio: Envio): Promise<Envio>;
  get(): Promise<Envio[]>;
  findById(id: number): Promise<Envio | null>;
}
