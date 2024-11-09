import { UsuarioNivel } from '../enum/usuario-nivel.enum';
import { UsuarioSituacao } from '../enum/usuario-situacao.enum';

export interface Usuario {
    id?: string;
    nome: string;
    email: string;
    senha: string;
    nivel: UsuarioNivel;
    situacao: UsuarioSituacao;
    login: string;
}
