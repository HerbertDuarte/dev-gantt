import { defineStore } from 'pinia';
import { computed, onMounted, ref } from 'vue';
import { fakeMarcos, fakeProjetos } from './fakedb';
import { Tarefa } from '../../domain/entities/tarefa';
import { Marco } from '../../domain/entities/marco';
import { Ganttable } from '../../domain/aggregates/ganttable';
import { api } from '../boot/axios';
import { Projeto } from '../../domain/entities/projeto';

export const useGanttStore = defineStore('gantt', () => {
    const projeto = ref<Projeto>();
    const projetos = ref<Projeto[]>();

    const marcos = computed(() => {
        const m: Marco[] = [];
        projeto.value?.marcos.forEach((marco) => {
            m.push(new Marco(marco));
        });
        return m;
    });

    const tarefas = computed(() => {
        const t: Tarefa[] = [];
        marcos.value?.forEach((marco) => {
            marco.tarefas.forEach((tarefa) => {
                t.push(new Tarefa(tarefa));
            });
        });
        return t;
    });
    const ganttables = computed(() => {
        const g: Ganttable[] = [];
        marcos.value?.forEach((marco) => {
            g.push(new Marco(marco));
            const tarefasOrderByDataInicio = marco.tarefas.sort((a, b) => {
                return (
                    new Date(a.dataInicio).getTime() -
                    new Date(b.dataInicio).getTime()
                );
            });
            tarefasOrderByDataInicio.forEach((tarefa) => {
                g.push(new Tarefa(tarefa));
            });
        });
        return g;
    });

    async function buscaDadosGantt(projetoId: string) {
        const { data } = await api.get<any>('/projeto');
        projeto.value = new Projeto(data);
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
        projeto,
    };
});
