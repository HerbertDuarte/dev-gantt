<script setup lang="ts">
import { Ganttable, isMarco, isTarefa } from '../../../../../../domain/aggregates/ganttable';
import { responsaveis } from '../../../../../../infrastructure/store/fakedb';
import GanttLeftRow from '../GanttLeftRow.vue';
defineProps<{
    index: number;
    ganttable: Ganttable
}>();

const reduzParaDois = (arr: any[]) => arr.slice(0, 2)
const possuiMaisDeDois = (arr: any[]) => arr.length > 2

</script>

<template>
    <GanttLeftRow :ganttable="ganttable" v-if="isTarefa(ganttable)" :index="index">
        <div class="flex justify-center items-center gap-1 h-gantt-row">
            <q-avatar class="q-mb-sm size-6 pt-1" v-for="responsavel in reduzParaDois(responsaveis)">
                <img :src="responsavel.imageUrl" />
            </q-avatar>
            <p v-if="possuiMaisDeDois(responsaveis)">+{{ responsaveis.length - 2 }}</p>
        </div>
    </GanttLeftRow>

    <GanttLeftRow :ganttable="ganttable" v-if="isMarco(ganttable)" :index="index" class="text-center">
        <span>-</span>
    </GanttLeftRow>
</template>