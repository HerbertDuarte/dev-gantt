import { Tarefa } from './tarefa';

export class Marco {
    id: number = 0;
    nome: string = '';
    tarefas: Tarefa[] = [];
    projetoId: number = 0;

    constructor(data: Partial<Marco> = {}) {
        Object.assign(this, data);
    }
}
