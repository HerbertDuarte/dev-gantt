<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useGanttStore } from '../../../../../infrastructure/store/gantt.store';
import GanttChartRow from './GanttChartRow.vue';
import GanttChartTableHead from './GanttChartTableHead.vue';
const ganttStore = useGanttStore();
const { ganttables } = storeToRefs(ganttStore)

</script>

<template>
    <table>
        <GanttChartTableHead />
        <tbody>
            <GanttChartRow :key="index" v-for="(ganttable, index) in ganttables" :index="index" :ganttable="ganttable"
                :ganttables="ganttables" />

        </tbody>
    </table>

</template>