import { SituacaoOption } from '../utils/situacao-options';

export interface CreateUsuarioDto {
    nome: string;
    email: string;
    situacao: SituacaoOption;
    login: string;
    senha: string;
}
