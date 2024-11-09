<script setup lang="ts">
defineProps<{
    index: number,
}>()
</script>

<template>
    <td :class="`p-0 whitespace-nowrap text-nowrap px-4 ${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}`">
        <slot />
    </td>
</template>