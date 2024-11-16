import { Marco } from '../entities/marco';
import { Tarefa } from '../entities/tarefa';

export type Ganttable = Tarefa | Marco;

export function isTarefa(ganttable: Ganttable): boolean {
    return (ganttable as Tarefa)?.marcoId !== undefined;
}

export function isMarco(ganttable: Ganttable): boolean {
    return (ganttable as Marco)?.tarefas !== undefined;
}

export function tarefas(ganttables: Ganttable[]) {
    return ganttables.filter(isTarefa) as Tarefa[];
}

export function marcos(ganttables: Ganttable[]) {
    return ganttables.filter(isMarco) as Marco[];
}

export function asTarefa(ganttable: Ganttable): Tarefa {
    return ganttable as Tarefa;
}

export function asMarco(ganttable: Ganttable): Marco {
    return ganttable as Marco;
}

export function asTarefas(ganttables: Ganttable[]): Tarefa[] {
    return tarefas(ganttables);
}

export function asMarcos(ganttables: Ganttable[]): Marco[] {
    return marcos(ganttables);
}
