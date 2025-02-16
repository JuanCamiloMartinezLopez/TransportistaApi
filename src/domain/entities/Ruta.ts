import { EstadosRuta } from '@constants/estadosRuta';
import { Envio } from './Envio';
import { Transportista } from './Transportista';
import { EstadoEnvio } from './EstadoEnvio';
import { EstadosEnvio } from '@constants/estadosEnvio';

export class Ruta {
  constructor(
    public id: number | null,
    public nombre: string,
    public origen: string,
    public destino: string,
    public estadoRuta: EstadosRuta,
    public transportista?: Transportista,
    public envios?: Envio[],
    public activo?: boolean,
    public fechaCreacion?: Date,
    public fecha_modificacion?: Date
  ) {}

  agregarEnvio(envio: Envio): boolean {
    const { peso, volumen } = this.calcularCarga();
    const vehiculo = this.transportista?.vehiculos!.length! > 0 ? this.transportista?.vehiculos![0] : null;
    if (vehiculo) {
      if (vehiculo.capacidad_peso > peso + envio.peso && vehiculo.capacidad_volumen > volumen + envio.calcularVolumen()) {
        this.envios?.push(envio);
        return true;
      }
    }
    return false;
  }

  calcularCarga() {
    let peso: number = 0;
    let volumen: number = 0;
    this.envios?.forEach((envio) => {
      peso += envio.peso;
      volumen += envio.calcularVolumen();
    });
    return { peso, volumen };
  }

  setEstadoTransito() {
    this.estadoRuta = EstadosRuta.TRANSITO;
    this.envios?.forEach((envio) => {
      envio.estados = envio.estados?.map((envio_estado) => {
        envio_estado.activo = false;
        return envio_estado;
      });
      envio.estados?.push(new EstadoEnvio(null, EstadosEnvio.TRANSITO));
    });
  }
}
