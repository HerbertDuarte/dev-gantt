import { StatusTarefa } from '../store/gantt.store';

export const colorClass = (status: StatusTarefa) => {
    switch (status) {
        case StatusTarefa.EM_ANDAMENTO:
            return 'blue-500';
        case StatusTarefa.CONCLUIDO:
            return 'green-500';
        case StatusTarefa.CONCLUIDO_ATRASO:
            return 'green-800';
        case StatusTarefa.ATRASADO:
            return 'red-500';
        default:
            return 'grey-500';
    }
};
