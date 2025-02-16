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
    public ruta: Ruta | null,
    public estados: EstadoEnvio[] | null,
    public direccion?: Direccion | null,
    public activo?: boolean,
    public fechaCreacion?: Date,
    public fechaModificacion?: Date
  ) {}
}
