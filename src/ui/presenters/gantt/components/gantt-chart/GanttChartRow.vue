<script setup lang="ts">
import { isSameDay, isSaturday, isSunday } from 'date-fns';
import { getListaDias } from '../../utils/get-lista-dias';
import { colorClass } from '../../utils/color-class';
import { Tarefa } from '../../../../../domain/entities/tarefa';

defineProps<{
    tarefa: Tarefa,
    tarefas: Tarefa[],
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
    <tr>
        <td :class="`p-0 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`"
            v-for="diaDeProjeto in getListaDias(tarefas[0].dataInicio, tarefas[tarefas.length - 1].dataFim)">
            <div :class="`h-9 p-0 ${diaClass(diaDeProjeto, tarefa)}`" v-if="!devePreencher(diaDeProjeto, tarefa)" />
            <div v-else :class="`h-7 p-0 bg-${colorClass(tarefa)}/50 ${tarefaClass(diaDeProjeto, tarefa)}`" />
        </td>
    </tr>
</template>