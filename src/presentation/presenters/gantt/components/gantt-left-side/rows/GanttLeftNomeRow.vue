<script setup lang="ts">
import { Ganttable, isMarco, isTarefa } from '../../../../../../domain/aggregates/ganttable';
import GanttLeftRow from '../GanttLeftRow.vue';
defineProps<{
    index: number;
    ganttable: Ganttable
}>();


</script>

<template>
    <GanttLeftRow :ganttable="ganttable" :index="index">
        <p v-if="isTarefa(ganttable)" class="pl-10 !text-left">
            {{ ganttable.nome }}
        </p>

        <p v-if="isMarco(ganttable)" class="pl-4 !text-left text-bold text-zinc-800">
            {{ ganttable.nome }}
        </p>
    </GanttLeftRow>
</template>