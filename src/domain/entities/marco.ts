export class Marco {
    nome: string = '';
    id: number = 0;

    constructor(data: Partial<Marco> = {}) {
        Object.assign(this, data);
    }
}
