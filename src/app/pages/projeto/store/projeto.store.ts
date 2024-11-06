import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Tarefa } from '../../gantt/store/gantt.store';
import { differenceInDays } from 'date-fns';

export type Projeto = {
    id: string;
    nome: string;
    descricao: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
};

export type ProjetoDetails = {
    duracaoProjetoExibicao: number;
    diasDaUltimaSemana: number;
    diasDaPrimeiraSemana: number;
    qtdSemanasInteiras: number;
};

export const useProjetoStore = defineStore('projeto', () => {
    const projeto = ref<Projeto>({
        createdAt: new Date(),
        descricao: '',
        id: '',
        nome: '',
        status: '',
        updatedAt: new Date(),
    });

    const projetos = ref<Projeto[]>([projeto.value]);

    const getDetails = (tarefas: Tarefa[]): ProjetoDetails => {
        if (!projeto.value) {
            return {
                duracaoProjetoExibicao: 16,
                diasDaUltimaSemana: 2,
                diasDaPrimeiraSemana: 0,
                qtdSemanasInteiras: 2,
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
