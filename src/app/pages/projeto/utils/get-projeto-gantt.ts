import { differenceInDays } from 'date-fns';
import { Tarefa } from '../../gantt/store/gantt.store';
import { ProjetoDetails } from '../store/projeto.store';

export function getPeriodoGantt(tarefas: Tarefa[]): ProjetoDetails {
    const duracaoProjetoExibicao = defineDuracaoProjeto(tarefas);
    const diasDaPrimeiraSemana = 2;
    const diasDaUltimaSemana = 0;
    const qtdSemanasInteiras = 2;

    return {
        duracaoProjetoExibicao,
        diasDaUltimaSemana,
        diasDaPrimeiraSemana,
        qtdSemanasInteiras,
    };
}

function defineDuracaoProjeto(tarefas: Tarefa[]) {
    return (
        differenceInDays(
            tarefas[tarefas.length - 1].data_fim,
            tarefas[0].data_inicio,
        ) + 1
    );
}
