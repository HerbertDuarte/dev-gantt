import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { fakeMarcos } from './fakedb';
import { Tarefa } from '../../domain/entities/tarefa';
import { Marco } from '../../domain/entities/marco';
import { Ganttable } from '../../domain/aggregates/ganttable';
import { api } from '../boot/axios';

export const useGanttStore = defineStore('gantt', () => {
    const marcos = ref<Marco[]>(fakeMarcos);
    const tarefas = computed(() => {
        const t: Tarefa[] = [];
        marcos.value.forEach((marco) => {
            t.push(...marco.tarefas);
        });
        return t;
    });
    const ganttables = computed(() => {
        const g: Ganttable[] = [];
        marcos.value.forEach((marco) => {
            g.push(marco);
            g.push(...marco.tarefas);
        });
        return g;
    });

    async function buscaDadosGantt(projetoId: number) {
        const { data } = await api.get<Marco[]>(`/marcos/projeto/${projetoId}`);
        marcos.value = data;
    }

    async function criaTarefa(tarefa: Tarefa) {
        const { data } = await api.post('/tarefas', tarefa);
        await buscaDadosGantt(data.projetoId);
    }

    async function criaMarco(marco: Marco) {
        const { data } = await api.post('/marcos', marco);
        await buscaDadosGantt(data.projetoId);
    }

    async function atualizaTarefa(tarefa: Tarefa) {
        const { data } = await api.put<Tarefa>(`/tarefas/${tarefa.id}`, tarefa);
        await buscaDadosGantt(data.projetoId);
    }

    async function atualizaMarco(marco: Marco) {
        const { data } = await api.put<Marco>(`/marcos/${marco.id}`, marco);
        await buscaDadosGantt(data.projetoId);
    }

    async function removeTarefa(tarefa: Tarefa) {
        const { data } = await api.delete(`/tarefas/${tarefa.id}`);
        await buscaDadosGantt(data.projetoId);
    }

    return {
        tarefas,
        marcos,
        ganttables,
        buscaDadosGantt,
        criaTarefa,
        criaMarco,
        atualizaTarefa,
        atualizaMarco,
        removeTarefa,
    };
});
