export class Projeto {
    id: string = '';
    nome: string = '';
    descricao: string = '';
    status: string = '';
    createdAt: Date = new Date();
    updatedAt: Date = new Date();

    constructor(data: Partial<Projeto> = {}) {
        Object.assign(this, data);
    }
}
