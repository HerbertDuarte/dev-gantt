<template>
    <div v-if="tarefas && tarefas.length > 0" class="flex justify-start">
        <GanttLeftTable
            class="flex-1 border-4 outline outline-1 outline-zinc-200 shadow-lg overflow-hidden rounded-l-lg" />
        <GanttChartTable
            class="flex-1 border-4 outline outline-1 outline-zinc-200 shadow-lg overflow-hidden rounded-r-lg" />
    </div>
    <div v-else>
        <p v-if="projeto && marcos.length === 0">
            <b>Nenhuma</b> tarefa foi registrada no projeto
            <b>{{ projeto.nome }}</b>.
        </p>
        <p v-if="projeto && marcos.length > 0">
            {{ marcos.length > 1 ? 'Existem' : 'Existe' }}
            <b>
                <q-tooltip class="bg-blue-9 text-white text-lg" :delay="1000">
                    <p class="q-ma-none" :key="index" v-for="(marco, index) in marcos">
                        {{ marco.nome }}
                    </p>
                </q-tooltip>
                {{ marcos.length }} {{ marcos.length > 1 ? 'marcos' : 'marco' }}
            </b>
            {{ marcos.length > 1 ? 'registrados' : 'registrado' }} no projeto,
            porém <b>nenhuma</b> tarefa foi registrada no projeto
            <b>{{ projeto.nome }}</b>.
        </p>
    </div>

</template>
<script setup lang="ts">
import { useGanttStore } from '../store/gantt.store';
import { storeToRefs } from 'pinia';
import { useProjetoStore } from '../../projeto/store/projeto.store';
import GanttLeftTable from './gantt-left-side/GanttLeftTable.vue';
import GanttChartTable from './gantt-chart/GanttChartTable.vue';
const ganttStore = useGanttStore();
const projetoStore = useProjetoStore();
const { tarefas, marcos } = storeToRefs(ganttStore)
const { projeto } = storeToRefs(projetoStore)
</script>