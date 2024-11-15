import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { fakeMarcos } from './fakedb';
import { Tarefa } from '../../domain/entities/tarefa';
import { Marco } from '../../domain/entities/marco';
import { Ganttable } from '../../domain/aggregates/ganttable';

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

    return {
        tarefas,
        marcos,
        ganttables,
    };
});
