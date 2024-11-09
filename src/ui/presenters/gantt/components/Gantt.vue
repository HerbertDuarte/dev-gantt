<script setup lang="ts">
import { useGanttStore } from '../../../../infrastructure/store/gantt.store';
import { storeToRefs } from 'pinia';
import GanttLeftTable from './gantt-left-side/GanttLeftTable.vue';
import GanttChartTable from './gantt-chart/GanttChartTable.vue';
import { useProjetoStore } from '../../../../infrastructure/store/projeto.store';
const { tarefas, marcos } = storeToRefs(useGanttStore())
const { projeto } = storeToRefs(useProjetoStore())
</script>
<template>
    <div v-if="tarefas && tarefas.length > 0" class="flex justify-start">
        <div class="rounded-l-lg flex-1 table-container max-w-fit">
            <GanttLeftTable class="gantt-table bg-red-300" />
        </div>
        <div class=" rounded-r-lg flex-1 table-container">
            <GanttChartTable class="gantt-table" />
        </div>
    </div>
    <div v-else>
        <p v-if="projeto && marcos.length === 0">
            <b>Nenhuma</b> tarefa foi registrada no projeto
            <b>{{ projeto.nome }}</b>.
        </p>
        <p v-if="projeto && marcos.length > 0">
            {{ marcos.length > 1 ? 'Existem' : 'Existe' }}
            <b>
                <q-tooltip class="bg-blue-9 text-white text-lg" :delay="1000">
                    <p class="q-ma-none" :key="index" v-for="(marco, index) in marcos">
                        {{ marco.nome }}
                    </p>
                </q-tooltip>
                {{ marcos.length }} {{ marcos.length > 1 ? 'marcos' : 'marco' }}
            </b>
            {{ marcos.length > 1 ? 'registrados' : 'registrado' }} no projeto,
            porém <b>nenhuma</b> tarefa foi registrada no projeto
            <b>{{ projeto.nome }}</b>.
        </p>
    </div>

</template>
<style lang="css" scoped>
.gantt-table {
    @apply min-w-full min-h-full;
}

.table-container {
    @apply overflow-x-scroll border-4 outline outline-1 outline-zinc-200 shadow-lg
}
</style>