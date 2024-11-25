import { SituacaoOption } from '../utils/situacao-options';

export interface UpdateUsuarioDto {
    nome: string;
    email: string;
    situacao: SituacaoOption;
    login: string;
    senhaAntiga?: string;
    senhaNova?: string;
}
