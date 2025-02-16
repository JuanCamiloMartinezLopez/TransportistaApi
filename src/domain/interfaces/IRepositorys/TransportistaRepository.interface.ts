import { Transportista } from '@domain/entities/Transportista';

export interface TransportistaRepository {
  create(transportista: Transportista): Promise<Transportista>;
  findById(id: number): Promise<Transportista | null>;
  findByEmail(email: string): Promise<Transportista | null>;
}
