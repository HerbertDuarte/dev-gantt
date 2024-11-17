<script setup lang="ts">
import { Dialog } from 'quasar';
import { Projeto } from '../../../../../domain/entities/projeto';
import CreateTarefaDialog from '../create-tarefa/CreateTarefaDialog.vue';

defineProps<{
    projeto: Projeto
}>()

const openDialog = () => {
    Dialog.create({
        component: CreateTarefaDialog,
    });
}

</script>
<template>
    <thead class="uppercase sticky top-0 z-10">
        <tr class="bg-white h-gantt-row">
            <th colspan="3" class="text-left px-4 text-base">
                <span class="flex-1">{{ projeto.nome }}</span>

            </th>
            <th colspan="2" class="text-right px-2">
                <q-btn flat dense round icon="add" class="text-gray-500" @click="openDialog()" />
            </th>
        </tr>
        <tr class="bg-gray-100 h-11 outline outline-[1px] outline-gray-50 ">
            <th class="text-left px-4 whitespace-nowrap text-nowrap">Descrição</th>
            <th class="px-4 whitespace-nowrap text-nowrap">Responsaveis</th>
            <th class="px-4 whitespace-nowrap text-nowrap">Data início</th>
            <th class="px-4 whitespace-nowrap text-nowrap">Data final</th>
            <th class="px-4 whitespace-nowrap text-nowrap">Duração</th>
            <!-- <th class="px-4 whitespace-nowrap text-nowrap">Status</th> -->
        </tr>
    </thead>
</template>