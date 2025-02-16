export interface AutenticacionUsuarioInterface {
  login(email: string, pass: string): Promise<string>;
}
