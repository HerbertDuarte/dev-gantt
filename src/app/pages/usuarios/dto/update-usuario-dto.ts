import { Usuario } from '../../../../entities/usuario';

export interface UpdateUsuarioDto extends Omit<Usuario, 'senha'> {
    senhaAntiga?: string;
    senhaNova?: string;
}
