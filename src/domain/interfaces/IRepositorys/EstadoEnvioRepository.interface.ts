import { EstadoEnvio } from '@domain/entities/EstadoEnvio';

export interface EstadoEnvioRepository {
  create(estado_envio: EstadoEnvio): Promise<EstadoEnvio>;
}
