<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useGanttStore } from '../../../../../infrastructure/store/gantt.store';
import GanttChartRow from './GanttChartRow.vue';
import GanttChartTableHead from './GanttChartTableHead.vue';
import { tarefas } from '../../../../../domain/aggregates/ganttable';
const ganttStore = useGanttStore();
const { ganttables } = storeToRefs(ganttStore)

</script>

<template>
    <table v-if="tarefas(ganttables).length > 0">
        <GanttChartTableHead />
        <tbody>
            <GanttChartRow  :key="index" v-for="(ganttable, index) in ganttables" :index="index" :ganttable="ganttable"
                :ganttables="ganttables" />
            
        </tbody>
    </table>

    <div class="flex items-center justify-center text-center" v-else>
        <p>Não há tarefas cadastradas</p>
    </div>  
</template>