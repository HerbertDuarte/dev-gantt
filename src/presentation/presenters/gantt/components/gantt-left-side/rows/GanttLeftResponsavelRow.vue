<script setup lang="ts">
import { asTarefa, Ganttable, isMarco, isTarefa } from '../../../../../../domain/aggregates/ganttable';
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
            <q-avatar class="q-mb-sm size-6 pt-1" v-for="responsavel in reduzParaDois(asTarefa(ganttable).usuariosTarefas)">
                <img :src="responsavel.imageUrl" />
            </q-avatar>
            <p v-if="possuiMaisDeDois(asTarefa(ganttable).usuariosTarefas)">+{{ asTarefa(ganttable).usuariosTarefas.length - 2 }}</p>
        </div>
    </GanttLeftRow>

    <GanttLeftRow :ganttable="ganttable" v-if="isMarco(ganttable)" :index="index" class="text-center">

    </GanttLeftRow>
</template>