import { Envio } from './Envio';
import { Transportista } from './Transportista';

export class Ruta {
  constructor(
    public id: number | null,
    public nombre: string,
    public origen: string,
    public destino: string,
    public tiempoEstimado: number | null,
    public transportista: Transportista | null,
    public envios: Envio[] | null,
    public activo?: boolean,
    public fechaCreacion?: Date,
    public fecha_modificacion?: Date
  ) {}
}
