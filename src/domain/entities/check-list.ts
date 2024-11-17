import { CheckItem } from './check-item';

export class CheckList {
    id: number = 0;
    nome: string = '';
    itens: CheckItem[] = [];

    constructor(data: Partial<CheckList> = {}) {
        Object.assign(this, data);
    }
}
