import { Transportista } from '@domain/entities/Transportista';

export interface TransportistaRepository {
  create(transportista: Transportista): Promise<Transportista>;
}
