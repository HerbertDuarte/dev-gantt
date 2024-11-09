<script setup lang="ts">
import { differenceInDays, format } from 'date-fns';
import { storeToRefs } from 'pinia';
import { StatusTarefa, Tarefa, useGanttStore } from '../../store/gantt.store';
import GanttLeftTableHead from './GanttLeftTableHead.vue';
import GanttLeftRow from './GanttLeftRow.vue';
const ganttStore = useGanttStore();
const { tarefas, projeto } = storeToRefs(ganttStore);


function getDuration(tarefa: Tarefa) {
    return differenceInDays(tarefa.data_fim, tarefa.data_inicio) + 1
}

</script>

<template>
    <table v-if="projeto">
        <GanttLeftTableHead :projeto="projeto" />
        <tbody>
            <tr :key="tarefa.id" v-for="(tarefa, index) in tarefas">
                <GanttLeftRow :index="index" class="text-left">
                    <p :style="{ paddingLeft: `${tarefa.nivel * 16}px` }">
                        {{ tarefa.nome }}
                    </p>
                </GanttLeftRow>
                <GanttLeftRow :index="index" class="text-center">

                    <span v-if="
                        tarefa.status === StatusTarefa.MARCO ||
                        (tarefa.tarefas_filhas && tarefa.tarefas_filhas.length > 0)
                    ">
                        --
                    </span>
                    <span v-else>
                        {{ tarefa.responsavel?.nome.split(' ')[0] }}
                    </span>

                </GanttLeftRow>
                <GanttLeftRow :index="index" class="text-center">
                    {{ format(tarefa.data_inicio, "dd/MM/yyyy") }}
                </GanttLeftRow>
                <GanttLeftRow :index="index" class="text-center">
                    {{ format(tarefa.data_fim, "dd/MM/yyyy") }}
                </GanttLeftRow>
                <GanttLeftRow :index="index" class="text-center">
                    {{ `${getDuration(tarefa)} ${getDuration(tarefa) > 1 ? 'dias' : 'dia'}` }}
                </GanttLeftRow>
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