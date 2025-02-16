import { Ciudades } from '@constants/ciudades';
import { Departamentos } from '@constants/departamentos';
import { Envio } from './Envio';

export class Direccion {
  constructor(
    public id: number | null,
    public direccion: string,
    public barrio: string,
    public ciudad: Ciudades,
    public departamento: Departamentos,
    public envios?: Envio[],
    public codigoPosta?: string,
    public activo?: boolean,
    public fechaCreacion?: Date,
    public fechaModificacion?: Date
  ) {}
}
