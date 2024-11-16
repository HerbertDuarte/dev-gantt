import {
    asMarco,
    asTarefa,
    Ganttable,
} from '../../../../domain/aggregates/ganttable';

export const devePreencherTarefa = (
    diaDeProjeto: Date,
    ganttable: Ganttable,
) => {
    return (
        diaDeProjeto >= asTarefa(ganttable).dataInicio &&
        diaDeProjeto <= asTarefa(ganttable).dataFim
    );
};

export const devePreencherMarco = (
    diaDeProjeto: Date,
    ganttable: Ganttable,
) => {
    const marco = asMarco(ganttable);
    const tarefaInicial = marco.tarefas[0];
    const tarefaFinal = marco.tarefas[marco.tarefas.length - 1];
    return (
        diaDeProjeto >= tarefaInicial.dataInicio &&
        diaDeProjeto <= tarefaFinal.dataFim
    );
};
