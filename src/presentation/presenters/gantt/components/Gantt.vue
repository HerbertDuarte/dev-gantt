<script setup lang="ts">
import { useGanttStore } from '../../../../infrastructure/store/gantt.store';
import { storeToRefs } from 'pinia';
import GanttLeftTable from './gantt-left-side/GanttLeftTable.vue';
import GanttChartTable from './gantt-chart/GanttChartTable.vue';
import GanttEmptyTable from './GanttEmptyTable.vue';
import { onMounted, ref } from 'vue';
import { Projeto } from '../../../../domain/entities/projeto';
import { Marco } from '../../../../domain/entities/marco';
import { api } from '../../../../infrastructure/boot/axios';
const store = useGanttStore()
const { tarefas, marcos, projeto } = storeToRefs(store)

const div1 = ref<HTMLElement | null>(null)
const div2 = ref<HTMLElement | null>(null)

function syncScroll(source: string) {
    const sourceDiv = source === 'div1' ? div1.value : div2.value
    const targetDiv = source === 'div1' ? div2.value : div1.value

    if (!sourceDiv || !targetDiv) return
    targetDiv.scrollTop = sourceDiv.scrollTop
}

onMounted(async () => {
    await store.buscaDadosGantt("asd")
});

onMounted(async () => {

});
</script>
<template v-if="projeto">
    <div v-if="tarefas && tarefas.length > 0" class=" main-container ">
        <div @scroll="syncScroll('div1')" ref="div1"
            class="rounded-l-lg table-container max-w-fit resize-x hide-scrollbar">
            <GanttLeftTable class="gantt-table " />
        </div>
        <div @scroll="syncScroll('div2')" ref="div2" class=" rounded-r-lg table-container flex-1 hide-scrollbar">
            <GanttChartTable class="gantt-table" />
        </div>
    </div>
    <div v-else>
        <GanttEmptyTable :projeto="(projeto as Projeto)" :marcos="(marcos as Marco[])" />
    </div>


</template>
<style lang="css" scoped>
.gantt-table {
    @apply min-w-full min-h-full;
}

.table-container {
    @apply overflow-x-scroll border-4 shadow-lg
}

.main-container {
    @apply flex justify-start max-h-content;
}
</style>