import { Tarefa } from './tarefa';

export class Marco {
    id: string = '';
    nome: string = '';
    tarefas: Tarefa[] = [];
    projetoId: string = '';

    constructor(data: Partial<Marco> = {}) {
        Object.assign(this, data);
    }
}
