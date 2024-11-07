<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useProjetoStore } from '../../../projeto/store/projeto.store';
import { useGanttStore } from '../../store/gantt.store';
import GanttChartRow from './GanttChartRow.vue';
import GanttChartTableHead from './GanttChartTableHead.vue';
const ganttStore = useGanttStore();
const projetoStore = useProjetoStore();
const { projeto } = storeToRefs(projetoStore)
const { tarefas } = storeToRefs(ganttStore)
const dadosProjeto = projetoStore.getDetails(tarefas.value);

</script>

<template>
    <table>
        <GanttChartTableHead :dadosProjeto="dadosProjeto" />
        <tbody>
            <GanttChartRow :key="tarefaIndex" v-for="(tarefa, tarefaIndex) in tarefas" :index="tarefaIndex"
                :tarefa="tarefa" :tarefas="tarefas" />

        </tbody>
    </table>

</template>