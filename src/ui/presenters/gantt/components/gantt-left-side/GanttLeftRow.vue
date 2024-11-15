<script setup lang="ts">
defineProps<{
    index: number,
}>()
</script>

<template>
    <td :class="`p-0 whitespace-nowrap text-nowrap mx-auto ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`">
        <slot />
    </td>
</template>