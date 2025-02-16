import { Transportista } from './Transportista';

export class Vehiculo {
  constructor(
    public id: number | null,
    public placa: string,
    public capacidad_volumen: number,
    public capacidad_peso: number,
    public transportista?: Transportista,
    public activo?: boolean,
    public fechaCreacion?: Date,
    public fechaModificacion?: Date
  ) {}
}
