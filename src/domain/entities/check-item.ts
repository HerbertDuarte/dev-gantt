export class CheckItem {
    id: number = 0;
    descricao: string = '';
    concluido: boolean = false;
    dataConclusao: Date = new Date();

    constructor(data: Partial<CheckItem> = {}) {
        Object.assign(this, data);
    }
}
