import { UsuarioSituacao } from '../enum/usuario-situacao.enum';

export interface UpdateUsuarioDto {
    nome: string;
    email: string;
    situacao: UsuarioSituacao;
    login: string;
    senhaAntiga?: string;
    senhaNova?: string;
}
