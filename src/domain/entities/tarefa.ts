import { StatusTarefa } from '../enum/status-tarefa.enum';
import { CheckList } from './check-list';

type TarefaProps = {
    id: string;
    nome: string;
    responsaveis: Reponsavel[];
    descricao: string;
    dataInicio: string;
    dataFim: string;
    status: StatusTarefa;
    marcoid: string;
    projetoId: string;
    checkLists: CheckList[];
};

export class Tarefa {
    id: string = '';
    nome: string = '';
    responsaveis: Reponsavel[] = [];
    descricao: string = '';
    dataInicio: Date = new Date();
    dataFim: Date = new Date();
    status: StatusTarefa = StatusTarefa.NAO_INICIADO;
    marcoid: string = '';
    projetoId: string = '';
    checkLists: CheckList[] = [];

    constructor(data: Partial<Tarefa> = {}) {
        Object.assign(this, {
            ...data,
            dataInicio: data.dataInicio && new Date(data.dataInicio),
            dataFim: data.dataFim && new Date(data.dataFim),
        });
    }
}

export class Reponsavel {
    nome: string = '';

    constructor(data: Partial<Reponsavel> = {}) {
        Object.assign(this, data);
    }
}
