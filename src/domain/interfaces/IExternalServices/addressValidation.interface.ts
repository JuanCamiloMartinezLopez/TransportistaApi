import { Direccion } from '@domain/entities/Direccion';

export interface AddressValidation {
  buscarDireccion(direccion: Direccion): Promise<any>;
}
