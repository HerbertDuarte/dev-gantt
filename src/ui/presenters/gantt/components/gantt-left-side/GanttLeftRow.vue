<script setup lang="ts">
import { Ganttable, isMarco, isTarefa } from '../../../../../domain/aggregates/ganttable';

defineProps<{
    index: number,
    ganttable: Ganttable
}>()
</script>

<template>
    <td v-if="isTarefa(ganttable)"
        :class="`p-0 h-gantt-row whitespace-nowrap text-nowrap text-center mx-auto ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`">
        <slot />
    </td>
    <td v-if="isMarco(ganttable)"
        :class="`p-0 h-gantt-row whitespace-nowrap text-nowrap text-center mx-auto ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`">
        <slot />
    </td>
</template>