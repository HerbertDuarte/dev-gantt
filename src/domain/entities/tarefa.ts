import { StatusTarefa } from '../enum/status-tarefa.enum';

export class Tarefa {
    nome: string = '';
    responsavel: Reponsavel = new Reponsavel();
    dataInicio: Date = new Date();
    dataFim: Date = new Date();
    status: StatusTarefa = StatusTarefa.NAO_INICIADO;
    id: number = 0;
    marcoId: number = 0;

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
