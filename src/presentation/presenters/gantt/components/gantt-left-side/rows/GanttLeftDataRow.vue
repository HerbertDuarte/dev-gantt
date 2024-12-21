<script setup lang="ts">
import { format } from 'date-fns';
import { asMarco, asTarefa, Ganttable, isMarco, isTarefa } from '../../../../../../domain/aggregates/ganttable';

import GanttLeftRow from '../GanttLeftRow.vue';

defineProps<{
    index: number;
    ganttable: Ganttable,
    dataFim?: boolean,
    dataInicio?: boolean
}>();


</script>

<template>
    <GanttLeftRow :ganttable="ganttable" v-if="isTarefa(ganttable)" :index="index" class="text-center">
        <div v-if="dataInicio" class="bg-slate-200 rounded-full text-slate-700 w-fit px-2.5 mx-auto">
            {{ format(asTarefa(ganttable).dataInicio, "dd/MM/yyyy") }}
        </div>
        <div v-else-if="dataFim" class="bg-slate-200 rounded-full text-slate-700 w-fit px-2.5 mx-auto">
            {{ format(asTarefa(ganttable).dataFim, "dd/MM/yyyy") }}
        </div>
    </GanttLeftRow>

    <GanttLeftRow :ganttable="ganttable" v-if="isMarco(ganttable)" :index="index" class="text-center">
        <div v-if="dataInicio" class="bg-slate-400/60 rounded-full text-slate-700 w-fit px-2.5 mx-auto">
            <span v-if="asMarco(ganttable).tarefas.length > 0">
                {{ format(asMarco(ganttable).tarefas[0].dataInicio, "dd/MM/yyyy") }}
            </span>
            <span v-else>
                N/A
            </span>
        </div>
        <div v-else-if="dataFim" class="bg-slate-400/60 rounded-full text-slate-700 w-fit px-2.5 mx-auto">
            <span v-if="asMarco(ganttable).tarefas.length > 0">
                {{ format(asMarco(ganttable).tarefas[asMarco(ganttable).tarefas.length - 1].dataFim, "dd/MM/yyyy") }}
            </span>
            
            <span v-else>
                N/A
            </span>
        </div>
    </GanttLeftRow>
</template>