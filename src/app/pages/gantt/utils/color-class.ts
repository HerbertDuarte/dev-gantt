import { StatusTarefa, Tarefa } from '../store/gantt.store';

export const colorClass = (tarefa: Tarefa) => {
    const hoje = new Date();
    if (hoje > tarefa.data_fim) return 'red-500';
    switch (tarefa.status) {
        case StatusTarefa.EM_ANDAMENTO:
            return 'blue-500';
        case StatusTarefa.CONCLUIDO:
            return 'green-500';
        case StatusTarefa.CONCLUIDO_ATRASO:
            return 'green-800';
        default:
            return 'grey-500';
    }
};
