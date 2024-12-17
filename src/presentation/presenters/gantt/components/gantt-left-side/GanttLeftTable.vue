<script setup lang="ts">
import { storeToRefs } from 'pinia';
import GanttLeftTableHead from './GanttLeftTableHead.vue';

import { useGanttStore } from '../../../../../infrastructure/store/gantt.store';

import GanttLeftNomeRow from './rows/GanttLeftNomeRow.vue';
import GanttLeftResponsavelRow from './rows/GanttLeftResponsavelRow.vue';
import GanttLeftDuracaoRow from './rows/GanttLeftDuracaoRow.vue';
import GanttLeftDataRow from './rows/GanttLeftDataRow.vue';

const { ganttables, projeto } = storeToRefs(useGanttStore());

</script>

<template>
    <table v-if="projeto">
        <GanttLeftTableHead :projeto="projeto" />
        <tbody class="text-zinc-700">
            <tr :key="ganttable.id" v-for="(ganttable, index) in ganttables">

                <GanttLeftNomeRow :index="index" :ganttable="ganttable" />
                <GanttLeftResponsavelRow :index="index" :ganttable="ganttable" />
                <GanttLeftDataRow data-inicio :index="index" :ganttable="ganttable" />
                <GanttLeftDataRow data-fim :index="index" :ganttable="ganttable" />
                <GanttLeftDuracaoRow :index="index" :ganttable="ganttable" />

                <!-- <GanttLeftRow :index="index" class="text-center">
                    <div v-if="
                        (tarefa.tarefas_filhas && tarefa.tarefas_filhas.length > 0)

                    ">
                        <p>{{ tarefa.status }}</p>
                    </div>
                    <div v-else>
                        <SelectStatus :tarefa="tarefa" />
                    </div>
                </GanttLeftRow> -->
            </tr>
        </tbody>
    </table>

</template>