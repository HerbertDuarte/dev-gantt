import { SituacaoOption } from '../utils/situacao-options';

export interface FormCreateUsuarioDto {
    nome: string;
    email: string;
    situacao: SituacaoOption;
    login: string;
    senha: string;
}
