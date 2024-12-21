import { UsuarioSituacao } from '../../../../domain/enum/usuario-situacao.enum';

export interface FormUpdateUsuarioDto {
    nome: string;
    email: string;
    login: string;
    senhaAntiga?: string;
    senhaNova?: string;
}
