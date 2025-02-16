import { Envio } from './Envio';

export class Usuario {
  constructor(
    public id: number | null,
    public nombres: string,
    public apellidos: string,
    public email: string,
    public password: string,
    public telefono: string,
    public roles?: string,
    public activo?: boolean,
    public envios?: Envio[],
    public fechaCreacion?: Date,
    public fechaModificacion?: Date
  ) {}

  setPassword(encryptPass: string) {
    this.password = encryptPass;
  }
}
