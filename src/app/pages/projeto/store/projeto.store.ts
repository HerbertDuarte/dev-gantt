import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Tarefa } from '../../gantt/store/gantt.store';
import { differenceInDays } from 'date-fns';

export type Projeto = {
    id: string;
    nome: string;
    descricao: string;
    status: string;
    createdAt: string;
    updatedAt: string;
};

export type ProjetoDetails = {
    duracaoProjetoExibicao: number;
    diasDaUltimaSemana: number;
    diasDaPrimeiraSemana: number;
    qtdSemanasInteiras: number;
};

export const useProjetoStore = defineStore('projeto', () => {
    const projetos = ref<Projeto[]>([]);
    const projeto = ref<Projeto>();

    const getDetails = (tarefas: Tarefa[]): ProjetoDetails => {
        if (!projeto.value) {
            return {
                duracaoProjetoExibicao: 0,
                diasDaUltimaSemana: 0,
                diasDaPrimeiraSemana: 0,
                qtdSemanasInteiras: 0,
            };
        }

        const duracaoProjetoExibicao = defineDuracaoProjeto(tarefas);
        const diasDaPrimeiraSemana = 0;
        const diasDaUltimaSemana = 0;
        const qtdSemanasInteiras = 0;

        return {
            duracaoProjetoExibicao,
            diasDaUltimaSemana,
            diasDaPrimeiraSemana,
            qtdSemanasInteiras,
        };
    };

    function defineDuracaoProjeto(tarefas: Tarefa[]) {
        return differenceInDays(
            tarefas[0].data_fim,
            tarefas[tarefas.length - 1].data_inicio,
        );
    }

    return {
        projetos,
        projeto,
        getDetails,
    };
});
