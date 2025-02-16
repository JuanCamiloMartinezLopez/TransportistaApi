import { Envio } from '@domain/entities/Envio';

export interface ConsultarEstadosEnviosInterface {
  execute(usuario_id: number): Promise<Envio[]>;
}
