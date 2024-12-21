<script setup lang="ts">
import { differenceInDays, format } from 'date-fns';
import { asMarco, asTarefa, Ganttable, isMarco, isTarefa, } from '../../../../../../domain/aggregates/ganttable';
import { Tarefa } from '../../../../../../domain/entities/tarefa';

import GanttLeftRow from '../GanttLeftRow.vue';

defineProps<{
    index: number;
    ganttable: Ganttable
}>();

function getDuration(tarefa: Tarefa) {
    return differenceInDays(tarefa.dataFim, tarefa.dataInicio) + 1
}

function getDurationMarco(tarefas: Tarefa[]) {
    if (tarefas.length === 0) {
        return 0
    }
    const tarefaInicial = tarefas[0]
    const tarefaFinal = tarefas[tarefas.length - 1]
    return differenceInDays(tarefaFinal.dataFim, tarefaInicial.dataInicio) + 1
}

;
</script>

<template>
    <GanttLeftRow :ganttable="ganttable" v-if="isTarefa(ganttable)" :index="index" class="text-center">
        {{ `${getDuration(asTarefa(ganttable))} ${getDuration(asTarefa(ganttable)) > 1 ? 'dias' :
            'dia'}` }}
    </GanttLeftRow>

    <GanttLeftRow :ganttable="ganttable" v-if="isMarco(ganttable)" :index="index" class="text-center">
        {{ `${getDurationMarco(asMarco(ganttable).tarefas)} ${getDurationMarco(asMarco(ganttable).tarefas) > 1 ? 'dias'
            :
            'dia'}` }}
    </GanttLeftRow>
</template>