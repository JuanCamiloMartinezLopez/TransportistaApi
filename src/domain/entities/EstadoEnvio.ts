import { EstadosEnvio } from '@constants/estadosEnvio';
import { Envio } from './Envio';

export class EstadoEnvio {
  constructor(
    public id: number | null,
    public estado: EstadosEnvio,
    public envio?: Envio | null,
    public activo?: boolean,
    public fechaCreacion?: Date,
    public fechaModificacion?: Date
  ) {}
}
