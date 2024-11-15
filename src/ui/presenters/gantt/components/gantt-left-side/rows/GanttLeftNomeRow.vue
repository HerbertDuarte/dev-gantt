<script setup lang="ts">
import { Ganttable, isMarco, isTarefa } from '../../../../../../domain/aggregates/ganttable';
import GanttLeftRow from '../GanttLeftRow.vue';
defineProps<{
    index: number;
    ganttable: Ganttable
}>();


</script>

<template>
    <GanttLeftRow :ganttable="ganttable" :index="index" class="text-left">
        <p v-if="isTarefa(ganttable)" class="pl-8">
            {{ ganttable.nome }}
        </p>

        <p v-if="isMarco(ganttable)" class="pl-6">
            {{ ganttable.nome }}
        </p>
    </GanttLeftRow>
</template>