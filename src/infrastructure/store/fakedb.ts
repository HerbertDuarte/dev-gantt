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
        nome: 'Desenvolvimento de API de Autenticação',
        responsavel: { nome: 'Carlos Silva' },
        dataInicio: parseISO('2025-10-01'),
        dataFim: parseISO('2025-10-05'),
        marcoId: 1,
        status: StatusTarefa.CONCLUIDO_ATRASO,
        id: 1,
    },
    {
        nome: 'Implementação de Interface do Usuário',
        responsavel: { nome: 'Carlos Silva' },
        dataInicio: parseISO('2025-10-03'),
        dataFim: parseISO('2025-10-05'),
        marcoId: 1,
        status: StatusTarefa.CONCLUIDO,
        id: 2,
    },
    {
        nome: 'Teste de Integração',
        responsavel: { nome: 'Carlos Silva' },
        dataInicio: parseISO('2025-10-06'),
        dataFim: parseISO('2025-10-10'),
        marcoId: 1,
        status: StatusTarefa.EM_ANDAMENTO,
        id: 3,
    },
    {
        nome: 'Documentação da API',
        responsavel: { nome: 'Carlos Silva' },
        dataInicio: parseISO('2025-10-09'),
        dataFim: parseISO('2025-10-10'),
        marcoId: 1,
        status: StatusTarefa.EM_ANDAMENTO,
        id: 3,
    },
    {
        nome: 'Configuração de Ambiente de Produção',
        responsavel: { nome: 'Carlos Silva' },
        dataInicio: parseISO('2025-10-11'),
        dataFim: parseISO('2025-10-15'),
        marcoId: 1,
        status: StatusTarefa.PENDENTE,
        id: 4,
    },
    {
        nome: 'Revisão de Código',
        responsavel: { nome: 'Carlos Silva' },
        dataInicio: parseISO('2025-10-16'),
        dataFim: parseISO('2025-10-16'),
        marcoId: 1,
        status: StatusTarefa.NAO_INICIADO,
        id: 5,
    },
];

export const fakeTarefas2 = [
    {
        nome: 'Levantamento de Requisitos',
        responsavel: { nome: 'Ana Mendes' },
        dataInicio: parseISO('2025-10-17'),
        dataFim: parseISO('2025-10-25'),
        marcoId: 2,
        status: StatusTarefa.NAO_INICIADO,
        id: 6,
    },
    {
        nome: 'Desenvolvimento do Back-End',
        responsavel: { nome: 'Ana Mendes' },
        dataInicio: parseISO('2025-10-26'),
        dataFim: parseISO('2025-10-29'),
        marcoId: 2,
        status: StatusTarefa.PENDENTE,
        id: 7,
    },
    {
        nome: 'Configuração de Banco de Dados',
        responsavel: { nome: 'Ana Mendes' },
        dataInicio: parseISO('2025-10-30'),
        dataFim: parseISO('2025-11-05'),
        marcoId: 2,
        status: StatusTarefa.EM_ANDAMENTO,
        id: 8,
    },
    {
        nome: 'Testes de Performance',
        responsavel: { nome: 'Ana Mendes' },
        dataInicio: parseISO('2025-11-06'),
        dataFim: parseISO('2025-11-09'),
        marcoId: 2,
        status: StatusTarefa.CONCLUIDO_ATRASO,
        id: 9,
    },
];

export const fakeTarefas3 = [
    {
        nome: 'Implementação de Sistema de Notificações',
        responsavel: { nome: 'Marcos Pereira' },
        dataInicio: parseISO('2025-11-10'),
        dataFim: parseISO('2025-11-16'),
        marcoId: 3,
        status: StatusTarefa.CONCLUIDO_ATRASO,
        id: 10,
    },
    {
        nome: 'Criação de Funcionalidade de Login Social',
        responsavel: { nome: 'Marcos Pereira' },
        dataInicio: parseISO('2025-11-14'),
        dataFim: parseISO('2025-11-16'),
        marcoId: 3,
        status: StatusTarefa.CONCLUIDO,
        id: 11,
    },
    {
        nome: 'Design de Interface para Perfil de Usuário',
        responsavel: { nome: 'Marcos Pereira' },
        dataInicio: parseISO('2025-11-17'),
        dataFim: parseISO('2025-11-21'),
        marcoId: 3,
        status: StatusTarefa.EM_ANDAMENTO,
        id: 12,
    },
    {
        nome: 'Aprimoramento de SEO',
        responsavel: { nome: 'Marcos Pereira' },
        dataInicio: parseISO('2025-11-22'),
        dataFim: parseISO('2025-11-30'),
        marcoId: 3,
        status: StatusTarefa.EM_ANDAMENTO,
        id: 13,
    },
    {
        nome: 'Planejamento de Migração de Dados',
        responsavel: { nome: 'Marcos Pereira' },
        dataInicio: parseISO('2025-12-01'),
        dataFim: parseISO('2025-12-10'),
        marcoId: 3,
        status: StatusTarefa.PENDENTE,
        id: 14,
    },
];

export const fakeProjetos = [
    {
        id: '1',
        nome: 'Portal de Serviços ao Cliente',
        descricao:
            'Desenvolvimento de um portal de serviços integrado para clientes',
        marcoId: 0,
        status: 'andamento',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: '2',
        nome: 'Sistema de Gerenciamento de Inventário',
        descricao:
            'Projeto para otimizar o gerenciamento de estoque e inventário',
        marcoId: 0,
        status: 'andamento',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: '3',
        nome: 'Aplicativo Móvel de Vendas',
        descricao:
            'Aplicativo voltado para facilitar as vendas via dispositivos móveis',
        marcoId: 0,
        status: 'andamento',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];
const getTarefas = (id: number): Tarefa[] =>
    fakeTarefas.map((tarefa) => {
        tarefa.marcoId = id;
        return new Tarefa(tarefa);
    });

const getTarefas2 = (id: number): Tarefa[] =>
    fakeTarefas2.map((tarefa) => {
        tarefa.marcoId = id;
        return new Tarefa(tarefa);
    });

const getTarefas3 = (id: number): Tarefa[] =>
    fakeTarefas3.map((tarefa) => {
        tarefa.marcoId = id;
        return new Tarefa(tarefa);
    });
export const fakeMarcos: Marco[] = [
    { nome: 'Planejamento Inicial', id: 1, tarefas: getTarefas(1) },
    { nome: 'Desenvolvimento Backend', id: 2, tarefas: getTarefas2(2) },
    { nome: 'Finalização e Testes', id: 3, tarefas: getTarefas3(3) },
    { nome: 'Finalização e Testes', id: 4, tarefas: getTarefas3(4) },
    { nome: 'Finalização e Testes', id: 5, tarefas: getTarefas3(5) },
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
