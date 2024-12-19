import { UsuarioSituacao } from '../enum/usuario-situacao.enum';

export class Usuario {
    id: string = '';
    nome: string = '';
    email: string = '';
    senha: string = '';
    situacao: UsuarioSituacao = UsuarioSituacao.ATIVO;
    login: string = '';

    constructor(usuario: Partial<Usuario>) {
        Object.assign(this, usuario);
    }
}
