import { UsuarioSituacao } from '../enum/usuario-situacao.enum';

export interface Usuario {
    id?: string;
    nome: string;
    email: string;
    senha: string;
    situacao: UsuarioSituacao;
    login: string;
}
