import { Marco } from './marco';
import { Tarefa } from './tarefa';

export type Ganttable = Tarefa | Marco;

export function isTarefa(ganttable: Ganttable): boolean {
    return (ganttable as Tarefa).marcoId !== undefined;
}

export function isMarco(ganttable: Ganttable): boolean {
    return (ganttable as Marco).tarefas !== undefined;
}
