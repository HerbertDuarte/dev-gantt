<script setup lang="ts">
import { isSameDay } from 'date-fns';
import { asMarco, asTarefas, Ganttable, isMarco } from '../../../../../../domain/aggregates/ganttable';
import { Marco } from '../../../../../../domain/entities/marco';
import { getListaDias } from '../../../utils/get-lista-dias';

const props = defineProps<{
    ganttable: Ganttable,
    ganttables: Ganttable[],
    index: number
}>();

const devePreencher = (diaDeProjeto: Date) => {
    const marco = asMarco(props.ganttable);
    const tarefaInicial = marco.tarefas[0];
    const tarefaFinal = marco.tarefas[marco.tarefas.length - 1];
    return diaDeProjeto >= tarefaInicial.dataInicio && diaDeProjeto <= tarefaFinal.dataFim;
}

const roundedClass = (diaDeProjeto: Date) => {
    const classList: string[] = []
    const marco = asMarco(props.ganttable);
    const tarefaInicial = marco.tarefas[0];
    const tarefaFinal = marco.tarefas[marco.tarefas.length - 1];
    isSameDay(diaDeProjeto, tarefaInicial.dataInicio) && classList.push("rounded-l")
    isSameDay(diaDeProjeto, tarefaFinal.dataFim) && classList.push("rounded-r")
    return classList.join(" ")
}

</script>

<template>
    <tr v-if="isMarco(ganttable)" class="p-0">
        <td :class="`h-gantt-row p-0 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`" v-for="diaDeProjeto in
            getListaDias(asTarefas(ganttables)[0].dataInicio,
                asTarefas(ganttables)[asTarefas(ganttables).length - 1].dataFim)">

            <div v-if="devePreencher(diaDeProjeto)" :class="`h-full bg-black/70 ${roundedClass(diaDeProjeto)}`" />
        </td>
    </tr>
</template>