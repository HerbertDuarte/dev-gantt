import { StatusTarefa } from '../enum/status-tarefa.enum';

export class Tarefa {
    nome: string = '';
    responsavel: Reponsavel = new Reponsavel();
    data_inicio: Date = new Date();
    data_fim: Date = new Date();
    status: StatusTarefa = StatusTarefa.PENDENTE;
    id: number = 0;
    nivel: number = 0;
    num: number = 0;
    tarefas_filhas: Tarefa[] = [];

    constructor(data: Partial<Tarefa> = {}) {
        Object.assign(this, data);
    }
}

export class Reponsavel {
    nome: string = '';

    constructor(data: Partial<Reponsavel> = {}) {
        Object.assign(this, data);
    }
}
