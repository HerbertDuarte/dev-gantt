<script setup lang="ts">
import { Dialog } from 'quasar';
import { asTarefa, Ganttable, isMarco, isTarefa } from '../../../../../domain/aggregates/ganttable';
import InfoTarefaDialog from '../info-tarefa/InfoTarefaDialog.vue';
import { Tarefa } from '../../../../../domain/entities/tarefa';

defineProps<{
    index: number,
    ganttable: Ganttable
}>()


function openTarefaDialog(ganttable:Ganttable){
    const tarefa = asTarefa(ganttable)
    Dialog.create({
        component: InfoTarefaDialog,
        componentProps: {
            tarefa
        }
    })
}
</script>

<template>
    <td v-if="isTarefa(ganttable)"
        @click="openTarefaDialog(ganttable)"
        :class="`p-0 h-gantt-row whitespace-nowrap text-nowrap text-center mx-auto cursor-pointer ${index % 2 === 0 ? 'bg-white' : 'bg-slate-100'}`">
        <slot />
    </td>
    <td v-if="isMarco(ganttable)"
        :class="`p-0 h-gantt-row whitespace-nowrap text-nowrap text-center mx-auto ${index % 2 === 0 ? 'bg-white' : 'bg-slate-100'}`">
        <slot />
    </td>
</template>