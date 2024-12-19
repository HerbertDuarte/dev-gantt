import { StatusTarefa } from '../enum/status-tarefa.enum';
import { CheckList } from './check-list';
import { Usuario } from './usuario';
export class Tarefa {
    id: string = '';
    nome: string = '';
    usuariosTarefas: Usuario[] = [];
    descricao: string = '';
    dataInicio: Date = new Date();
    dataFim: Date = new Date();
    status: StatusTarefa = StatusTarefa.NAO_INICIADO;
    marcoId: string = '';
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
