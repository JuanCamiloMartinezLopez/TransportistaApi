import { TYPES } from '@constants/types';
import { Container } from 'inversify';
import './api/usuario/usuarioController';
import './api/autenticacion/autenticacionController';
import { UsuarioRepositoryImpl } from '@infrastructure/repositories/UsuarioRepositoryImpl';
import { UsuarioRepository } from '@domain/interfaces/UsuarioRepository.interface';
import { RegistroUsuarioUseCase } from '@application/usesCases/registroUsuario';
import Database from '@infrastructure/database/data-source';
import { AutenticacionUsuarioUseCase } from '@application/usesCases/autenticacionUsuario';

const container = new Container();

container.bind<Database>(TYPES.Database).to(Database).inSingletonScope();
container.bind<UsuarioRepository>(TYPES.UsuarioRepository).to(UsuarioRepositoryImpl);
container.bind<RegistroUsuarioUseCase>(TYPES.RegistroUsuarioUseCase).to(RegistroUsuarioUseCase);
container.bind<AutenticacionUsuarioUseCase>(TYPES.AutenticacionUsuarioUseCase).to(AutenticacionUsuarioUseCase);

export default container;
