<script setup lang="ts">
import { isSameDay } from 'date-fns';
import { Tarefa } from '../../store/gantt.store';
import { getListaDias } from '../../utils/get-lista-dias';
import { colorClass } from '../../utils/color-class';

defineProps<{
    tarefa: Tarefa,
    tarefas: Tarefa[],
    index: number
}>();

const devePreencher = (diaDeProjeto: Date, tarefa: Tarefa) => {
    return diaDeProjeto >= tarefa.data_inicio && diaDeProjeto <= tarefa.data_fim;
}

const addDetailsClass = (diaDeProjeto: Date, tarefa: Tarefa) => {
    let className = ""

    if (isSameDay(diaDeProjeto, tarefa.data_inicio)) {
        className += "rounded-l-lg"
    }

    if (isSameDay(diaDeProjeto, tarefa.data_fim)) {
        className += " rounded-r-lg"
    }
    return className
}
</script>

<template>
    <tr>
        <td :class="`p-0 ${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}`"
            v-for="diaDeProjeto in getListaDias(tarefas[0].data_inicio, tarefas[tarefas.length - 1].data_fim)">
            <div class="h-8 p-0" v-if="!devePreencher(diaDeProjeto, tarefa)" />
            <div v-else :class="`h-7 p-0 bg-${colorClass(tarefa)}/50 ${addDetailsClass(diaDeProjeto, tarefa)}`" />
        </td>
    </tr>
</template>