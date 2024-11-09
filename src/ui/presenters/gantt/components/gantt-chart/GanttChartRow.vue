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
    return diaDeProjeto >= tarefa.data_inicio && diaDeProjeto <= tarefa.data_fim;
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
    isSameDay(diaDeProjeto, tarefa.data_inicio) && classList.push("rounded-l-lg")
    isSameDay(diaDeProjeto, tarefa.data_fim) && classList.push("rounded-r-lg")
}

const fimSemanaClass = (classList: string[], diaDeProjeto: Date) => {
    if (isSunday(diaDeProjeto)) {
        classList.push("border-l-2 border-white/20")
    }
}

</script>

<template>
    <tr>
        <td :class="`p-0 ${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}`"
            v-for="diaDeProjeto in getListaDias(tarefas[0].data_inicio, tarefas[tarefas.length - 1].data_fim)">
            <div :class="`h-8 p-0 ${diaClass(diaDeProjeto, tarefa)}`" v-if="!devePreencher(diaDeProjeto, tarefa)" />
            <div v-else :class="`h-7 p-0 bg-${colorClass(tarefa)}/50 ${tarefaClass(diaDeProjeto, tarefa)}`" />
        </td>
    </tr>
</template>