import { Ciudades } from '@constants/ciudades';
import { Departamentos } from '@constants/departamentos';
import { Envio } from './Envio';

export class Direccion {
  constructor(
    public id: number | null,
    public direccion: string,
    public barrio: string,
    public codigoPostal: string | null,
    public ciudad: Ciudades,
    public departamento: Departamentos,
    public envios: Envio[] | null,
    public activo?: boolean,
    public fechaCreacion?: Date,
    public fechaModificacion?: Date
  ) {}
}
