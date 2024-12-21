import {
    differenceInDays,
    eachDayOfInterval,
    isSameWeek,
    startOfWeek,
} from 'date-fns';
import { Tarefa } from '../../../../domain/entities/tarefa';
import { Periodo } from '../../../../domain/entities/periodo';
import { getListaDias } from '../../gantt/utils/get-lista-dias';

export function getPeriodoGantt(tarefas: Tarefa[]): Periodo {
    if (tarefas.length === 0) {
        return {
            dias: [],
            duracaoProjetoExibicao: 0,
            diasDaUltimaSemana: 0,
            diasDaPrimeiraSemana: 0,
            qtdSemanasInteiras: 0,
        };
    }

    if (tarefas.length === 1) {
        return {
            dias: [tarefas[0].dataInicio],
            duracaoProjetoExibicao: 1,
            diasDaUltimaSemana: 1,
            diasDaPrimeiraSemana: 0,
            qtdSemanasInteiras: 0,
        };
    }

    const diasProjeto = getListaDias(
        tarefas[0].dataInicio,
        tarefas[tarefas.length - 1].dataFim,
    );

    const semanas = separarPorSemanas(diasProjeto);

    const duracaoProjetoExibicao = defineDuracaoProjeto(tarefas);
    const diasDaPrimeiraSemana = getQtdDiasPrimeiraSemana(semanas);
    const diasDaUltimaSemana = getQtdDiasUltimaSemana(semanas);
    const qtdSemanasInteiras = getQtdSemanasInteiras(semanas);

    return {
        dias: diasProjeto,
        duracaoProjetoExibicao,
        diasDaUltimaSemana,
        diasDaPrimeiraSemana,
        qtdSemanasInteiras,
    };
}

function defineDuracaoProjeto(tarefas: Tarefa[]) {
    return (
        differenceInDays(
            tarefas[tarefas.length - 1].dataFim,
            tarefas[0].dataInicio,
        ) + 1
    );
}

function separarPorSemanas(diasProjeto: Date[]): Date[][] {
    const semanas = [];
    let semanaAtual: Date[] = [];
    let inicioDaSemana = startOfWeek(diasProjeto[0]);

    diasProjeto.forEach((dia) => {
        if (isSameWeek(dia, inicioDaSemana)) {
            semanaAtual.push(dia);
        } else {
            semanas.push(semanaAtual);
            semanaAtual = [dia];
            inicioDaSemana = startOfWeek(dia);
        }
    });

    if (semanaAtual.length > 0) {
        semanas.push(semanaAtual);
    }

    return semanas;
}

function getQtdDiasPrimeiraSemana(semanas: Date[][]): number {
    if (semanas[0].length === 7) return 0;
    return semanas[0].length;
}

function getQtdSemanasInteiras(semanas: Date[][]): number {
    let qtdSemanasInteiras = 0;

    semanas.forEach((semana) => {
        if (semana.length === 7) {
            qtdSemanasInteiras++;
        }
    });

    return qtdSemanasInteiras;
}

function getQtdDiasUltimaSemana(semanas: Date[][]): number {
    if (semanas[semanas.length - 1].length === 7) return 0;
    return semanas[semanas.length - 1].length;
}
