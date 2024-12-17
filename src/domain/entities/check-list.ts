import { CheckItem } from './check-item';

export class CheckList {
    id: string = '';
    nome: string = '';
    itens: CheckItem[] = [];

    constructor(data: Partial<CheckList> = {}) {
        Object.assign(this, data);
    }
}
