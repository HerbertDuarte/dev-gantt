import { parseISO } from 'date-fns';

enum StatusTarefa {
    PENDENTE = 'Pendente',
    EM_ANDAMENTO = 'Em andamento',
    CONCLUIDO = 'Concluido',
    CONCLUIDO_ATRASO = 'Concluido com atraso',
    MARCO = 'Marco',
}
export const fakeTarefas = [
    {
        nome: 'Tarefa 1',
        responsavel: { nome: 'Responsável 1' },
        data_inicio: parseISO('2025-10-01'),
        data_fim: parseISO('2025-10-05'),
        status: StatusTarefa.CONCLUIDO_ATRASO,
        id: 1,
        nivel: 1,
        num: 1,
        tarefas_filhas: [],
    },
    {
        nome: 'Tarefa 2',
        responsavel: { nome: 'Responsável 1' },
        data_inicio: parseISO('2025-10-03'),
        data_fim: parseISO('2025-10-05'),
        status: StatusTarefa.CONCLUIDO,
        id: 2,
        nivel: 2,
        num: 2,
        tarefas_filhas: [],
    },
    {
        nome: 'Tarefa 3',
        responsavel: { nome: 'Responsável 1' },
        data_inicio: parseISO('2025-10-06'),
        data_fim: parseISO('2025-10-10'),
        status: StatusTarefa.EM_ANDAMENTO,
        id: 3,
        nivel: 1,
        num: 2,
        tarefas_filhas: [],
    },
    {
        nome: 'Tarefa 4',
        responsavel: { nome: 'Responsável 1' },
        data_inicio: parseISO('2025-10-11'),
        data_fim: parseISO('2025-10-15'),
        status: StatusTarefa.EM_ANDAMENTO,
        id: 4,
        nivel: 1,
        num: 2,
        tarefas_filhas: [],
    },
    {
        nome: 'Tarefa 5',
        responsavel: { nome: 'Responsável 1' },
        data_inicio: parseISO('2025-10-16'),
        data_fim: parseISO('2025-10-16'),
        status: StatusTarefa.EM_ANDAMENTO,
        id: 5,
        nivel: 1,
        num: 2,
        tarefas_filhas: [],
    },
];
export const fakeMarcos = [{ nome: 'Marco 1' }];

export const fakeProjetos = [
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
