import { isSameDay } from 'date-fns';
import {
    asMarco,
    asTarefa,
    Ganttable,
    isMarco,
    isTarefa,
} from '../../../../domain/aggregates/ganttable';
import { ganttBorder } from './gantt-border-class';

export function isPrimeiroDiaPreenchidoClass(
    diaDeProjeto: Date,
    ganttable: Ganttable,
) {
    if (isTarefa(ganttable)) {
        const tarefa = asTarefa(ganttable);
        if (isSameDay(diaDeProjeto, tarefa.dataInicio)) {
            return ganttBorder(diaDeProjeto);
        }
    } else if (isMarco(ganttable)) {
        const marco = asMarco(ganttable);
        const tarefaInicial = marco.tarefas[0];
        if (isSameDay(diaDeProjeto, tarefaInicial.dataInicio)) {
            return ganttBorder(diaDeProjeto);
        }
    }
}
