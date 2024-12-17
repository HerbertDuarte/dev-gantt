export class CheckItem {
    id: string = '';
    descricao: string = '';
    concluido: boolean = false;
    dataConclusao?: null;

    constructor(data: Partial<CheckItem> = {}) {
        Object.assign(this, data);
    }
}
