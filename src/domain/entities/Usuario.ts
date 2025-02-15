export class Usuario {
  constructor(
    public id: number | null,
    public nombres: string,
    public apellidos: string,
    public email: string,
    public password: string,
    public telefono: string,
    public direccion: string
  ) {}

  setPassword(encryptPass: string) {
    this.password = encryptPass;
  }
}
