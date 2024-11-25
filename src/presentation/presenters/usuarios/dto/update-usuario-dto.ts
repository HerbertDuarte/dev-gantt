import { UsuarioSituacao } from '../../../../domain/enum/usuario-situacao.enum';
import { SituacaoOption } from '../utils/situacao-options';

export interface UpdateUsuarioDto {
    nome: string;
    email: string;
    situacao: SituacaoOption;
    login: string;
    senhaAntiga?: string;
    senhaNova?: string;
}

export interface UpdateUsuarioRequestDto {
    nome: string;
    email: string;
    situacao: UsuarioSituacao;
    login: string;
    senhaAntiga?: string;
    senhaNova?: string;
}
