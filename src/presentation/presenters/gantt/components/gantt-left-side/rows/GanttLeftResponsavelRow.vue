<script setup lang="ts">
import { asTarefa, Ganttable, isMarco, isTarefa } from '../../../../../../domain/aggregates/ganttable';
import { Usuario } from '../../../../../../domain/entities/usuario';
import GanttLeftRow from '../GanttLeftRow.vue';
defineProps<{
    index: number;
    ganttable: Ganttable
}>();

const reduzParaDois = (usuarioTarefas: {usuario:Usuario}[]) => usuarioTarefas.slice(0, 2)
const possuiMaisDeDois = (usuarioTarefas: {usuario:Usuario}[]) => usuarioTarefas.length > 2

</script>

<template>
    <GanttLeftRow :ganttable="ganttable" v-if="isTarefa(ganttable)" :index="index">
        <div v-if="asTarefa(ganttable).usuariosTarefas.length === 1" class="flex justify-center items-center h-gantt-row">
            <q-avatar class="q-mb-sm size-6 pt-1">
                <img :src="asTarefa(ganttable).usuariosTarefas[0].usuario.imageUrl" />
            </q-avatar>
            <p class="pl-1.5">{{ asTarefa(ganttable).usuariosTarefas[0].usuario.nome.split(" ")[0] }}</p>
        </div>
        <div v-else-if="asTarefa(ganttable).usuariosTarefas.length  > 1" class="flex justify-center items-center gap-1 h-gantt-row">
            <q-avatar class="q-mb-sm size-6 pt-1" v-for="usuarioTarefa in reduzParaDois(asTarefa(ganttable).usuariosTarefas)">
                <img :src="usuarioTarefa.usuario.imageUrl" />
            </q-avatar>
            <p v-if="possuiMaisDeDois(asTarefa(ganttable).usuariosTarefas)">+{{ asTarefa(ganttable).usuariosTarefas.length - 2 }}</p>
        </div>
        <div v-else class="flex justify-center items-center h-gantt-row">
            <p>N/A</p>
        </div>
    </GanttLeftRow>

    <GanttLeftRow :ganttable="ganttable" v-if="isMarco(ganttable)" :index="index" class="text-center">
        <div class="flex justify-center items-center h-gantt-row">
        </div>
    </GanttLeftRow>
</template>