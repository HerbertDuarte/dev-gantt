<script setup lang="ts">
import { Ganttable, isMarco, isTarefa } from '../../../../../domain/aggregates/ganttable';
import GanttChartMarcoRow from './rows/GanttChartMarcoRow.vue';
import GanttChartTarefaRow from './rows/GanttChartTarefaRow.vue';

defineProps<{
    ganttable: Ganttable,
    ganttables: Ganttable[],
    index: number
}>();

</script>

<template>
    <GanttChartTarefaRow :ganttable="ganttable" :ganttables="ganttables" :index="index" v-if="isTarefa(ganttable)" />
    <GanttChartMarcoRow :ganttable="ganttable" :ganttables="ganttables" :index="index" v-if="isMarco(ganttable)" />
</template>