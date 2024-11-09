import { defineStore } from 'pinia';
import { ref } from 'vue';
import { fakeMarcos, fakeProjetos, fakeTarefas } from './fakedb';
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

export enum StatusTarefa {
    PENDENTE = 'Pendente',
    EM_ANDAMENTO = 'Em andamento',
    CONCLUIDO = 'Concluido',
    CONCLUIDO_ATRASO = 'Concluido com atraso',
    MARCO = 'Marco',
}

export type Tarefa = {
    nome: string;
    responsavel: { nome: string };
    data_inicio: Date;
    data_fim: Date;
    status: StatusTarefa;
    id: number;
    nivel: number;
    num: number;
    tarefas_filhas: Tarefa[];
};

export const useGanttStore = defineStore('gantt', () => {
    const tarefas = ref<Tarefa[]>(fakeTarefas);
    const tarefa = ref<Tarefa>();
    const marcos = ref(fakeMarcos);

    return {
        tarefas,
        tarefa,
        marcos,
    };
});
