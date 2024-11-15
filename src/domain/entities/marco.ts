import { Tarefa } from './tarefa';

export class Marco {
    nome: string = '';
    id: number = 0;
    tarefas: Tarefa[] = [];

    constructor(data: Partial<Marco> = {}) {
        Object.assign(this, data);
    }
}
