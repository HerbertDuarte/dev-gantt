<script setup lang="ts">
import { isSameDay } from 'date-fns';
import { Tarefa } from '../../store/gantt.store';
import { getListaDias } from '../../utils/get-lista-dias';
import { colorClass } from '../../utils/color-class';

defineProps<{
    tarefa: Tarefa,
    tarefas: Tarefa[]
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
    <td class="p-0" v-for="diaDeProjeto in getListaDias(tarefas[0].data_inicio, tarefas[tarefas.length - 1].data_fim)">
        <div class="h-6 p-0" v-if="!devePreencher(diaDeProjeto, tarefa)"></div>
        <div v-else :class="`h-6 p-0 bg-${colorClass(tarefa)} ${addDetailsClass(diaDeProjeto, tarefa)}`">
        </div>
    </td>
</template>