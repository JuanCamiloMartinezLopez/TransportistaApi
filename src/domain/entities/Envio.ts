import { Direccion } from './Direccion';
import { EstadoEnvio } from './EstadoEnvio';
import { Usuario } from './Usuario';
import { Ruta } from './Ruta';

export class Envio {
  constructor(
    public id: number | null,
    public peso: number,
    public usuario: Usuario,
    public tipoProducto: string,
    public alto: number,
    public ancho: number,
    public profundidad: number,
    public estados?: EstadoEnvio[],
    public ruta?: Ruta,
    public direccion?: Direccion,
    public activo?: boolean,
    public fechaCreacion?: Date,
    public fechaModificacion?: Date
  ) {}

  calcularVolumen(): number {
    return this.alto * this.ancho * this.profundidad;
  }
}
