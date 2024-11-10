<script setup lang="ts">
import { useGanttStore } from '../../../../infrastructure/store/gantt.store';
import { storeToRefs } from 'pinia';
import GanttLeftTable from './gantt-left-side/GanttLeftTable.vue';
import GanttChartTable from './gantt-chart/GanttChartTable.vue';
import { useProjetoStore } from '../../../../infrastructure/store/projeto.store';
import GanttEmptyTable from './GanttEmptyTable.vue';
import { ref } from 'vue';
const { tarefas, marcos } = storeToRefs(useGanttStore())
const { projeto } = storeToRefs(useProjetoStore())

const div1 = ref<HTMLElement | null>(null)
const div2 = ref<HTMLElement | null>(null)

function syncScroll(source: string) {
    const sourceDiv = source === 'div1' ? div1.value : div2.value
    const targetDiv = source === 'div1' ? div2.value : div1.value

    if (!sourceDiv || !targetDiv) return
    targetDiv.scrollTop = sourceDiv.scrollTop
    targetDiv.scrollLeft = sourceDiv.scrollLeft
}
</script>
<template>
    <div v-if="tarefas && tarefas.length > 0" class=" main-container ">
        <div @scroll="syncScroll('div1')" ref="div1" class="rounded-l-lg table-container max-w-fit ">
            <GanttLeftTable class="gantt-table bg-red-300" />
        </div>
        <div @scroll="syncScroll('div2')" ref="div2" class=" rounded-r-lg table-container">
            <GanttChartTable class="gantt-table" />
        </div>
    </div>
    <div v-else>
        <GanttEmptyTable :projeto="projeto" :marcos="marcos" />
    </div>

</template>
<style lang="css" scoped>
.gantt-table {
    @apply min-w-full min-h-full;
}

.table-container {
    @apply flex-1 overflow-x-scroll border-4 outline outline-1 outline-zinc-200 shadow-lg
}

.main-container {
    @apply flex justify-start h-content;
}


.hide-scrollbar::-webkit-scrollbar {
    display: none;
}
</style>