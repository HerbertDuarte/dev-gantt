import { defineStore } from 'pinia';
import { onMounted, ref } from 'vue';
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

const fakeProjeto = {
    createdAt: new Date(),
    descricao: 'vazia',
    id: 'teste',
    nome: 'nome',
    status: 'andamento',
    updatedAt: new Date(),
};

export const useProjetoStore = defineStore('projeto', () => {
    const projeto = ref<Projeto>();
    const projetos = ref<Projeto[]>([]);

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

    onMounted(() => {
        projetos.value = [
            {
                id: '1',
                nome: 'Projeto 1',
                descricao: 'Descrição do projeto 1',
                status: 'andamento',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: '2',
                nome: 'Projeto 2',
                descricao: 'Descrição do projeto 2',
                status: 'andamento',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: '3',
                nome: 'Projeto 3',
                descricao: 'Descrição do projeto 3',
                status: 'andamento',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ];

        projeto.value = projetos.value[0];
    });

    return {
        projetos,
        projeto,
        getDetails,
    };
});
