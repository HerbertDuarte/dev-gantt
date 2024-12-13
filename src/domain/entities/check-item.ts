export class CheckItem {
    id: number = 0;
    descricao: string = '';
    concluido: boolean = false;
    dataConclusao?: null;

    constructor(data: Partial<CheckItem> = {}) {
        Object.assign(this, data);
    }
}
