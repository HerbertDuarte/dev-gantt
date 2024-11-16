<script setup lang="ts">
import { isSameDay, isSaturday, isSunday } from 'date-fns';
import { getListaDias } from '../../utils/get-lista-dias';
import { colorClass } from '../../utils/color-class';
import { Tarefa } from '../../../../../domain/entities/tarefa';
import { asTarefa, asTarefas, Ganttable, isMarco, isTarefa } from '../../../../../domain/aggregates/ganttable';
import GanttChartMarcoRow from './rows/GanttChartMarcoRow.vue';
import GanttChartTarefaRow from './rows/GanttChartTarefaRow.vue';

defineProps<{
    ganttable: Ganttable,
    ganttables: Ganttable[],
    index: number
}>();

const devePreencher = (diaDeProjeto: Date, tarefa: Tarefa) => {
    return diaDeProjeto >= tarefa.dataInicio && diaDeProjeto <= tarefa.dataFim;
}

const tarefaClass = (diaDeProjeto: Date, tarefa: Tarefa) => {
    const classList: string[] = []
    roundedClass(classList, diaDeProjeto, tarefa)
    fimSemanaClass(classList, diaDeProjeto)
    return classList.join(" ")
}

const diaClass = (diaDeProjeto: Date, tarefa: Tarefa) => {
    const classList: string[] = []
    fimSemanaClass(classList, diaDeProjeto)
    return classList.join(" ")
}


const roundedClass = (classList: string[], diaDeProjeto: Date, tarefa: Tarefa) => {
    isSameDay(diaDeProjeto, tarefa.dataInicio) && classList.push("rounded-l-lg")
    isSameDay(diaDeProjeto, tarefa.dataFim) && classList.push("rounded-r-lg")
}

const fimSemanaClass = (classList: string[], diaDeProjeto: Date) => {
    if (isSunday(diaDeProjeto)) {
        classList.push("border-l-2 border-zinc-200/20")
    }
}

</script>

<template>
    <GanttChartTarefaRow :ganttable="ganttable" :ganttables="ganttables" :index="index" v-if="isTarefa(ganttable)" />
    <GanttChartMarcoRow :ganttable="ganttable" :ganttables="ganttables" :index="index" v-if="isMarco(ganttable)" />
</template>