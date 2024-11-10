import { defineStore } from 'pinia';
import { ref } from 'vue';
import { fakeMarcos, fakeTarefas } from './fakedb';
import { Tarefa } from '../../domain/entities/tarefa';
import { Marco } from '../../domain/entities/marco';

export const useGanttStore = defineStore('gantt', () => {
    const tarefas = ref<Tarefa[]>([
        ...fakeTarefas,
        ...fakeTarefas,
        ...fakeTarefas,
        ...fakeTarefas,
    ]);
    const tarefa = ref<Tarefa>();
    const marcos = ref<Marco[]>(fakeMarcos);

    return {
        tarefas,
        tarefa,
        marcos,
    };
});
