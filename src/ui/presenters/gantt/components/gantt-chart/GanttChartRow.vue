<script setup lang="ts">
import { isSameDay, isSaturday, isSunday } from 'date-fns';
import { getListaDias } from '../../utils/get-lista-dias';
import { colorClass } from '../../utils/color-class';
import { Tarefa } from '../../../../../domain/entities/tarefa';
import { asTarefa, asTarefas, Ganttable, isMarco, isTarefa } from '../../../../../domain/aggregates/ganttable';
import GanttChartMarcoRow from './rows/GanttChartMarcoRow.vue';

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
    <tr v-if="isTarefa(ganttable)" class="p-0">
        <td :class="`h-gantt-row p-0 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`" v-for="diaDeProjeto in
            getListaDias(asTarefas(ganttables)[0].dataInicio,
                asTarefas(ganttables)[asTarefas(ganttables).length - 1].dataFim)">
            <div :class="`h-full ${diaClass(diaDeProjeto, asTarefa(ganttable))}`"
                v-if="!devePreencher(diaDeProjeto, asTarefa(ganttable))" />
            <div v-else
                :class="`h-full bg-${colorClass(asTarefa(ganttable))}/50 ${tarefaClass(diaDeProjeto, asTarefa(ganttable))}`" />
        </td>
    </tr>


    <GanttChartMarcoRow :ganttable="ganttable" :ganttables="ganttables" :index="index" v-if="isMarco(ganttable)" />
</template>