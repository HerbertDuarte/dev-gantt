import { Marco } from './marco';
import { Tarefa } from './tarefa';

export type Ganttable = Tarefa | Marco;

export class GanttableUtils {
    static isTarefa(ganttable: Ganttable): boolean {
        return (ganttable as Tarefa).marcoId !== undefined;
    }

    static isMarco(ganttable: Ganttable): boolean {
        return (ganttable as Marco).tarefas !== undefined;
    }

    static tarefas(ganttables: Ganttable[]) {
        return ganttables.filter(GanttableUtils.isTarefa) as Tarefa[];
    }

    static marcos(ganttables: Ganttable[]) {
        return ganttables.filter(GanttableUtils.isMarco) as Marco[];
    }
}
