<script setup lang="ts">
import { Projeto } from '../../../../../domain/entities/projeto';

defineProps<{
    projeto: Projeto
}>()
</script>
<template>
    <thead class="uppercase sticky top-0 z-10">
        <tr class="bg-gray-100 h-9">
            <th colspan="6" class="text-left px-5">
                {{ projeto.nome }}
            </th>
        </tr>
        <tr class="bg-gray-200 h-11">
            <th class="px-4 whitespace-nowrap text-nowrap">Tarefa</th>
            <th class="px-4 whitespace-nowrap text-nowrap">Responsaveis</th>
            <th class="px-4 whitespace-nowrap text-nowrap">Data início</th>
            <th class="px-4 whitespace-nowrap text-nowrap">Data final</th>
            <th class="px-4 whitespace-nowrap text-nowrap">Duração</th>
            <!-- <th>Status</th> -->
        </tr>
    </thead>
</template>