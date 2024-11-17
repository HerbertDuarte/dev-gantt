import { Tarefa } from './tarefa';

export class Marco {
    id: number = 0;
    nome: string = '';
    tarefas: Tarefa[] = [];

    constructor(data: Partial<Marco> = {}) {
        Object.assign(this, data);
    }
}
