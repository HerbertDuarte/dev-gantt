export class Usuario {
    id: string = '';
    nome: string = '';
    email: string = '';
    senha: string = '';
    login: string = '';
    imageUrl: string = '';

    constructor(usuario: Partial<Usuario>) {
        Object.assign(this, usuario);
    }
}
