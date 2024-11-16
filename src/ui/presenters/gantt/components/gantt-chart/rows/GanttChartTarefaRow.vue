<script setup lang="ts">
import { isSameDay, isSunday } from 'date-fns';
import { asTarefa, asTarefas, Ganttable, isMarco, isTarefa } from '../../../../../../domain/aggregates/ganttable';
import { Tarefa } from '../../../../../../domain/entities/tarefa';
import { getListaDias } from '../../../utils/get-lista-dias';
import { colorClass } from '../../../utils/color-class';


const props = defineProps<{
    ganttable: Ganttable,
    ganttables: Ganttable[],
    index: number
}>();

const devePreencher = (diaDeProjeto: Date) => {
    return diaDeProjeto >= asTarefa(props.ganttable).dataInicio && diaDeProjeto <= asTarefa(props.ganttable).dataFim;
}

const tarefaClass = (diaDeProjeto: Date) => {
    const classList: string[] = []
    roundedClass(classList, diaDeProjeto, asTarefa(props.ganttable))
    fimSemanaClass(classList, diaDeProjeto)
    return classList.join(" ")
}

const diaClass = (diaDeProjeto: Date) => {
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
        classList.push("")
    }
}

</script>

<template>
    <tr class="p-0">
        <td :class="`h-gantt-row py-1 p-0 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`" v-for="diaDeProjeto in
            getListaDias(asTarefas(ganttables)[0].dataInicio,
                asTarefas(ganttables)[asTarefas(ganttables).length - 1].dataFim)">
            <div :class="`h-full ${diaClass(diaDeProjeto)}`" v-if="!devePreencher(diaDeProjeto)" />
            <div v-else :class="`h-full mx-px bg-${colorClass(asTarefa(ganttable))}/50 ${tarefaClass(diaDeProjeto)}`" />
        </td>
    </tr>
</template>