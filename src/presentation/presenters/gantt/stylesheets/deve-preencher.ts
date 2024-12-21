import { startOfDay } from 'date-fns';
import {
    asMarco,
    asTarefa,
    Ganttable,
} from '../../../../domain/aggregates/ganttable';

export const devePreencherTarefa = (
    diaDeProjeto: Date,
    ganttable: Ganttable,
) => {
    const diaNormalizado = startOfDay(diaDeProjeto);
    const dataInicioNormalizada = startOfDay(asTarefa(ganttable).dataInicio);
    const dataFimNormalizada = startOfDay(asTarefa(ganttable).dataFim);
    return (
        diaNormalizado >= dataInicioNormalizada &&
        diaNormalizado <= dataFimNormalizada
    );
};

export const devePreencherMarco = (
    diaDeProjeto: Date,
    ganttable: Ganttable,
) => {
    const marco = asMarco(ganttable);
    const tarefaInicial = marco.tarefas[0];
    const tarefaFinal = marco.tarefas[marco.tarefas.length - 1];
    if (!tarefaInicial || !tarefaFinal) {
        return false;
    }

    const diaNormalizado = startOfDay(diaDeProjeto);
    const dataInicioNormalizada = startOfDay(tarefaInicial.dataInicio);
    const dataFimNormalizada = startOfDay(tarefaFinal.dataFim);

    return (
        diaNormalizado >= dataInicioNormalizada &&
        diaNormalizado <= dataFimNormalizada
    );
};
