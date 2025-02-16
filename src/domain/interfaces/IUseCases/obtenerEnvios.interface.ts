import { Envio } from '@domain/entities/Envio';

export interface ObtenerEnviosInterface {
  execute(): Promise<Envio[]>;
}
