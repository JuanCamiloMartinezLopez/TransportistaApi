import { Direccion } from '@domain/entities/Direccion';
import { AddressValidation } from '@domain/interfaces/IExternalServices/addressValidation.interface';
import { injectable } from 'inversify';
import { Settings } from '@settings';
import axios from 'axios';

@injectable()
export class AddressValidationNominatiom implements AddressValidation {
  async buscarDireccion(direccion: Direccion): Promise<boolean> {
    const response = await axios.get(Settings.urlnominatim, {
      params: {
        q: `${direccion.direccion}, ${direccion.ciudad}, Colombia`,
        format: 'json',
        addressdetails: 1,
        limit: 1
      }
    });

    if (response.data.length > 0) {
      const { lat, lon, display_name } = response.data[0];
      console.log(`📍 Dirección encontrada: ${display_name}`);
      console.log(`🌍 Latitud: ${lat}, Longitud: ${lon}`);
      return true;
    } else {
      console.log('❌ Dirección no encontrada.');
      return false;
    }
  }
}
