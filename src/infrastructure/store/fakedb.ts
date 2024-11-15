import { parseISO } from 'date-fns';
import { Marco } from '../../domain/entities/marco';
import { Tarefa } from '../../domain/entities/tarefa';

enum StatusTarefa {
    PENDENTE = 'Pendente',
    EM_ANDAMENTO = 'Em andamento',
    CONCLUIDO = 'Concluido',
    CONCLUIDO_ATRASO = 'Concluido com atraso',
    NAO_INICIADO = 'Não iniciado',
}
export const fakeTarefas = [
    {
        nome: 'Tarefa com nome muito grande 1',
        responsavel: { nome: 'Responsável 1' },
        dataInicio: parseISO('2025-10-01'),
        dataFim: parseISO('2025-10-05'),
        marcoId: 1,
        status: StatusTarefa.CONCLUIDO_ATRASO,
        id: 1,
    },
    {
        nome: 'Tarefa com nome muito grande2',
        responsavel: { nome: 'Responsável 1' },
        dataInicio: parseISO('2025-10-03'),
        dataFim: parseISO('2025-10-05'),
        marcoId: 1,
        status: StatusTarefa.CONCLUIDO,
        id: 2,
    },
    {
        nome: 'Tarefa com nome muito grande3',
        responsavel: { nome: 'Responsável 1' },
        dataInicio: parseISO('2025-10-06'),
        dataFim: parseISO('2025-10-10'),
        marcoId: 1,
        status: StatusTarefa.EM_ANDAMENTO,
        id: 3,
    },
    {
        nome: 'Tarefa com nome muito grande3',
        responsavel: { nome: 'Responsável 1' },
        dataInicio: parseISO('2025-10-09'),
        dataFim: parseISO('2025-10-10'),
        marcoId: 1,
        status: StatusTarefa.EM_ANDAMENTO,
        id: 3,
    },
    {
        nome: 'Tarefa com nome muito grande4',
        responsavel: { nome: 'Responsável 1' },
        dataInicio: parseISO('2025-10-11'),
        dataFim: parseISO('2025-10-15'),
        marcoId: 1,
        status: StatusTarefa.PENDENTE,
        id: 4,
    },
    {
        nome: 'Tarefa com nome muito grande 5',
        responsavel: { nome: 'Responsável 1' },
        dataInicio: parseISO('2025-10-16'),
        dataFim: parseISO('2025-10-16'),
        marcoId: 2,
        status: StatusTarefa.NAO_INICIADO,
        id: 5,
    },
    {
        nome: 'Tarefa com nome muito grande 6',
        responsavel: { nome: 'Responsável 1' },
        dataInicio: parseISO('2025-10-10'),
        dataFim: parseISO('2025-10-16'),
        marcoId: 2,
        status: StatusTarefa.CONCLUIDO,
        id: 5,
    },
    {
        nome: 'Tarefa com nome muito grande6',
        responsavel: { nome: 'Responsável 1' },
        dataInicio: parseISO('2025-10-12'),
        dataFim: parseISO('2025-10-16'),
        marcoId: 2,
        status: StatusTarefa.CONCLUIDO_ATRASO,
        id: 5,
    },
    {
        nome: 'Tarefa com nome muito grande6',
        responsavel: { nome: 'Responsável 1' },
        dataInicio: parseISO('2025-10-17'),
        dataFim: parseISO('2025-10-25'),
        marcoId: 2,
        status: StatusTarefa.NAO_INICIADO,
        id: 5,
    },
    {
        nome: 'Tarefa com nome muito grande7',
        responsavel: { nome: 'Responsável 1' },
        dataInicio: parseISO('2025-10-26'),
        dataFim: parseISO('2025-10-29'),
        marcoId: 3,
        status: StatusTarefa.PENDENTE,
        id: 5,
    },
    {
        nome: 'Tarefa 8',
        responsavel: { nome: 'Responsável 1' },
        dataInicio: parseISO('2025-10-30'),
        dataFim: parseISO('2025-11-05'),
        marcoId: 3,
        status: StatusTarefa.EM_ANDAMENTO,
        id: 5,
    },
    {
        nome: 'Tarefa 9',
        responsavel: { nome: 'Responsável 1' },
        dataInicio: parseISO('2025-11-06'),
        dataFim: parseISO('2025-11-09'),
        marcoId: 3,
        status: StatusTarefa.CONCLUIDO_ATRASO,
        id: 5,
    },
];

export const fakeProjetos = [
    {
        id: '1',
        nome: 'Desenvolvimento de Software',
        descricao: 'Descrição do projeto 1',
        marcoId: 1,
        status: 'andamento',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: '2',
        nome: 'Projeto 2',
        descricao: 'Descrição do projeto 2',
        marcoId: 1,
        status: 'andamento',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: '3',
        nome: 'Projeto 3',
        descricao: 'Descrição do projeto 3',
        marcoId: 1,
        status: 'andamento',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];

const getTarefas = (id: number): Tarefa[] =>
    fakeTarefas.filter((tarefa) => tarefa.marcoId === id);

export const fakeMarcos: Marco[] = [
    { nome: 'Marco 1', id: 1, tarefas: getTarefas(1) },
    { nome: 'Marco 2', id: 2, tarefas: getTarefas(2) },
    { nome: 'Marco 3', id: 3, tarefas: getTarefas(3) },
];

export const responsaveis = [
    {
        imageUrl:
            'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541',
        id: 1,
        nome: 'João',
    },
    {
        imageUrl:
            'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541',
        id: 2,
        nome: 'Maria',
    },
    {
        imageUrl:
            'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541',
        id: 3,
        nome: 'José',
    },
    {
        imageUrl:
            'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541',
        id: 4,
        nome: 'Maria',
    },
];
