import { Usuario } from '../../../../domain/entities/usuario';

export interface UpdateUsuarioDto extends Omit<Usuario, 'senha'> {
    senhaAntiga?: string;
    senhaNova?: string;
}
