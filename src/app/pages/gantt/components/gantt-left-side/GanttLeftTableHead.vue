<script setup lang="ts">
import { Projeto } from '../../../projeto/store/projeto.store';
defineProps<{
    projeto: Projeto
}>()
</script>
<template>
    <thead>
        <tr class="bg-gray-100 h-8">
            <th colspan="6" class="tarefa-table-title">
                {{ projeto.nome }}
            </th>
        </tr>
        <tr class="bg-gray-200 h-8">
            <th>Tarefa</th>
            <th>Responsável</th>
            <th>Data início</th>
            <th>Data final</th>
            <th>Duração</th>
            <!-- <th>Status</th> -->
        </tr>
    </thead>
</template>