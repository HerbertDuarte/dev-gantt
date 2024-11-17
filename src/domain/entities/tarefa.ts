import { StatusTarefa } from '../enum/status-tarefa.enum';
import { CheckList } from './check-list';

export class Tarefa {
    id: number = 0;
    nome: string = '';
    responsavel: Reponsavel = new Reponsavel();
    dataInicio: Date = new Date();
    dataFim: Date = new Date();
    status: StatusTarefa = StatusTarefa.NAO_INICIADO;
    marcoId: number = 0;
    checkLists: CheckList[] = [];

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
