import { isSameDay } from 'date-fns';
import {
    asMarco,
    asTarefa,
    Ganttable,
    isMarco,
    isTarefa,
} from '../../../../domain/aggregates/ganttable';

export function roundedClass(diaDeProjeto: Date, ganttable: Ganttable) {
    const classList: string[] = [];
    const rClass = 'rounded-r-lg mr-0.5';
    const lClass = 'rounded-l-lg ml-0.5';
    const lClassMarco = 'rounded-l-sm ml-0.5';
    const rClassMarco = 'rounded-r-sm mr-0.5';

    if (isTarefa(ganttable)) {
        const tarefa = asTarefa(ganttable);
        isSameDay(diaDeProjeto, tarefa.dataInicio) && classList.push(lClass);
        isSameDay(diaDeProjeto, tarefa.dataFim) && classList.push(rClass);
        return classList.join(' ');
    }

    if (isMarco(ganttable)) {
        const classList: string[] = [];
        const marco = asMarco(ganttable);
        const tarefaInicial = marco.tarefas[0];
        const tarefaFinal = marco.tarefas[marco.tarefas.length - 1];
        isSameDay(diaDeProjeto, tarefaInicial.dataInicio) &&
            classList.push(lClassMarco);
        isSameDay(diaDeProjeto, tarefaFinal.dataFim) &&
            classList.push(rClassMarco);
        return classList.join(' ');
    }
}
