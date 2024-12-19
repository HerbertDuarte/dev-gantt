import { defineStore } from 'pinia';
import { computed, onMounted, ref } from 'vue';
import { fakeMarcos, fakeProjetos } from './fakedb';
import { Tarefa } from '../../domain/entities/tarefa';
import { Marco } from '../../domain/entities/marco';
import { Ganttable } from '../../domain/aggregates/ganttable';
import { api } from '../boot/axios';
import { Projeto } from '../../domain/entities/projeto';
import { Usuario } from '../../domain/entities/usuario';

export const useGanttStore = defineStore('gantt', () => {
    const projeto = ref<Projeto>();
    const projetos = ref<Projeto[]>();

    const responsaveis = computed(() => {
        const r: Usuario[] = [];
        tarefas.value?.forEach((tarefa) => {
            tarefa.usuariosTarefas.forEach((usuario) => {
                if (!r.includes(usuario)) {
                    r.push(usuario);
                }
            });
        });
        return r;
    });

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
        const marcosOrderByDataInicio = marcos.value?.sort((a, b) => {
            return (
                a.tarefas[0].dataInicio.getTime() -
                b.tarefas[0].dataInicio.getTime()
            );
        });
        const g: Ganttable[] = [];
        marcosOrderByDataInicio.forEach((marco) => {
            g.push(new Marco(marco));
            const tarefasOrderByDataInicio = marco.tarefas.sort((a, b) => {
                return a.dataInicio.getTime() - b.dataInicio.getTime();
            });
            tarefasOrderByDataInicio.forEach((tarefa) => {
                g.push(new Tarefa(tarefa));
            });
        });
        return g;
    });

    async function buscaDadosGantt(projetoId: string) {
        const { data } = await api.get<Projeto>('/projeto');
        projeto.value = data;
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
        if (!projeto.value) return;
        const { data } = await api.put<Tarefa>(`/tarefas/${tarefa.id}`, tarefa);
        await buscaDadosGantt(projeto.value.id);
    }

    async function atualizaMarco(marco: Marco) {
        if (!projeto.value) return;
        const { data } = await api.put<Marco>(`/marcos/${marco.id}`, marco);
        await buscaDadosGantt(projeto.value.id);
    }

    async function removeTarefa(tarefa: Tarefa) {
        if (!projeto.value) return;
        const { data } = await api.delete(`/tarefas/${tarefa.id}`);
        await buscaDadosGantt(projeto.value.id);
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
        responsaveis,
    };
});
