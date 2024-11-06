import { defineStore } from 'pinia';
import { ref } from 'vue';

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

const fakeTarefas = [
    {
        nome: 'Tarefa 1',
        responsavel: { nome: 'Responsável 1' },
        data_inicio: new Date('2025-10-01'),
        data_fim: new Date('2025-10-05'),
        status: StatusTarefa.CONCLUIDO_ATRASO,
        id: 1,
        nivel: 1,
        num: 1,
        tarefas_filhas: [],
    },
    {
        nome: 'Tarefa 2',
        responsavel: { nome: 'Responsável 1' },
        data_inicio: new Date('2025-10-03'),
        data_fim: new Date('2025-10-05'),
        status: StatusTarefa.CONCLUIDO,
        id: 2,
        nivel: 2,
        num: 2,
        tarefas_filhas: [],
    },
    {
        nome: 'Tarefa 3',
        responsavel: { nome: 'Responsável 1' },
        data_inicio: new Date('2025-10-06'),
        data_fim: new Date('2025-10-10'),
        status: StatusTarefa.EM_ANDAMENTO,
        id: 3,
        nivel: 1,
        num: 2,
        tarefas_filhas: [],
    },
    {
        nome: 'Tarefa 4',
        responsavel: { nome: 'Responsável 1' },
        data_inicio: new Date('2025-10-11'),
        data_fim: new Date('2025-10-15'),
        status: StatusTarefa.EM_ANDAMENTO,
        id: 4,
        nivel: 1,
        num: 2,
        tarefas_filhas: [],
    },
    {
        nome: 'Tarefa 5',
        responsavel: { nome: 'Responsável 1' },
        data_inicio: new Date('2025-10-16'),
        data_fim: new Date('2025-10-16'),
        status: StatusTarefa.EM_ANDAMENTO,
        id: 5,
        nivel: 1,
        num: 2,
        tarefas_filhas: [],
    },
];

const fakeMarcos = [{ nome: 'Marco 1' }];

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
