import { TYPES } from '@constants/types';
import { Container } from 'inversify';
import { UsuarioRepositoryImpl } from '@infrastructure/repositories/UsuarioRepositoryImpl';
import { UsuarioRepository } from '@domain/interfaces/IRepositorys/UsuarioRepository.interface';
import { RegistroUsuarioUseCase } from '@application/usesCases/registroUsuario';
import Database from '@infrastructure/database/data-source';
import { AutenticacionUsuarioUseCase } from '@application/usesCases/autenticacionUsuario';
import { EnvioRepository } from '@domain/interfaces/IRepositorys/EnvioRepository.interface';
import { EnvioRepositoryImpl } from '@infrastructure/repositories/EnvioRepositoryImpl';
import { DireccionRepositoryImpl } from '@infrastructure/repositories/DireccionRepositoryImpl';
import { DireccionRepository } from '@domain/interfaces/IRepositorys/DireccionRepository.interface';
import { RegistroEnvioUseCase } from '@application/usesCases/registroEnvio';
import './api/usuario/usuarioController';
import './api/autenticacion/autenticacionController';
import './api/envio/envioController';
import { AddressValidation } from '@domain/interfaces/IExternalServices/addressValidation.interface';
import { AddressValidationNominatiom } from '@application/externalServices/addressValidationNominatim';

const container = new Container();

//database
container.bind<Database>(TYPES.Database).to(Database).inSingletonScope();
//repositorios
container.bind<UsuarioRepository>(TYPES.UsuarioRepository).to(UsuarioRepositoryImpl);
container.bind<EnvioRepository>(TYPES.EnvioRepository).to(EnvioRepositoryImpl);
container.bind<DireccionRepository>(TYPES.DireccionRepository).to(DireccionRepositoryImpl);
// container.bind<EstadoEnvioRepository>(TYPES.EstadoEnvioRepository).to(EstadoEnvioRepositoryImpl);
// container.bind<RutaRepository>(TYPES.RutaRepository).to(RutaRepositoryImpl);
// container.bind<TransportistaRepository>(TYPES.TransportistaRepository).to(TransportistaRepositoryImpl);
// container.bind<VehiculoRepository>(TYPES.VehiculoRepository).to(VehiculoRepository);

//casos de uso
container.bind<RegistroUsuarioUseCase>(TYPES.RegistroUsuarioUseCase).to(RegistroUsuarioUseCase);
container.bind<AutenticacionUsuarioUseCase>(TYPES.AutenticacionUsuarioUseCase).to(AutenticacionUsuarioUseCase);
container.bind<RegistroEnvioUseCase>(TYPES.RegistroEnvioUseCase).to(RegistroEnvioUseCase);

//servicios
container.bind<AddressValidationNominatiom>(TYPES.AddressValidation).to(AddressValidationNominatiom);

export default container;
