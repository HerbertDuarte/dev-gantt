<script setup lang="ts">

defineProps({
    projeto: Object
})
</script>
<template>
    <thead>
        <tr>
            <th colspan="6" class="tarefa-table-title">
                {{ projeto?.nome }}
            </th>
        </tr>
        <tr class="tarefa-tr">
            <th>Tarefa</th>
            <th>Responsável</th>
            <th>Data início</th>
            <th>Data final</th>
            <th>Duração</th>
            <th>Status</th>
        </tr>
    </thead>
</template>