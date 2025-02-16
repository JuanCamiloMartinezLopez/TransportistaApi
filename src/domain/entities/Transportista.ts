import { Ruta } from './Ruta';
import { Vehiculo } from './Vehiculo';

export class Transportista {
  constructor(
    public id: number | null,
    public nombre: string,
    public telefono: string,
    public correo: string,
    public rutas?: Ruta[],
    public vehiculos?: Vehiculo[],
    public activo?: boolean,
    public fechaCreacion?: Date,
    public fechaModificacion?: Date
  ) {}
}
