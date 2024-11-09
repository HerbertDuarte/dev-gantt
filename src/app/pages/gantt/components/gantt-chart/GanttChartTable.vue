<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useGanttStore } from '../../store/gantt.store';
import GanttChartRow from './GanttChartRow.vue';
import GanttChartTableHead from './GanttChartTableHead.vue';
const ganttStore = useGanttStore();
const { tarefas } = storeToRefs(ganttStore)

</script>

<template>
    <table>
        <GanttChartTableHead />
        <tbody>
            <GanttChartRow :key="tarefaIndex" v-for="(tarefa, tarefaIndex) in tarefas" :index="tarefaIndex"
                :tarefa="tarefa" :tarefas="tarefas" />

        </tbody>
    </table>

</template>