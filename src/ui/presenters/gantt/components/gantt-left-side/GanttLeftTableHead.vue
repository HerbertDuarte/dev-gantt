<script setup lang="ts">
import { Projeto } from '../../../../../domain/entities/projeto';

defineProps<{
    projeto: Projeto
}>()
</script>
<template>
    <thead class="uppercase sticky top-0">
        <tr class="bg-gray-100 h-8">
            <th colspan="6" class="text-left px-5">
                {{ projeto.nome }}
            </th>
        </tr>
        <tr class="bg-gray-200 h-11">
            <th>Tarefa</th>
            <th>Responsável</th>
            <th>Data início</th>
            <th>Data final</th>
            <th class="pr-2">Duração</th>
            <!-- <th>Status</th> -->
        </tr>
    </thead>
</template>