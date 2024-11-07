<script setup lang="ts">
import { differenceInDays, format } from 'date-fns';
import { storeToRefs } from 'pinia';
import { Projeto, useProjetoStore } from '../../../projeto/store/projeto.store';
import { StatusTarefa, Tarefa, useGanttStore } from '../../store/gantt.store';
import GanttLeftTableHead from './GanttLeftTableHead.vue';
import GanttLeftRow from './GanttLeftRow.vue';
const ganttStore = useGanttStore();
const projetoStore = useProjetoStore();
const { tarefas } = storeToRefs(ganttStore)
const { projeto } = storeToRefs(projetoStore)


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
                        <q-tooltip anchor="center middle" self="center middle" :delay="1000">
                            {{ tarefa.num }} - {{ tarefa.nome }}</q-tooltip>
                        {{ tarefa.num }} - {{ tarefa.nome }}
                    </p>
                </GanttLeftRow>
                <GanttLeftRow :index="index" class="text-center">
                    <p>
                        <span v-if="
                            tarefa.status === StatusTarefa.MARCO ||
                            (tarefa.tarefas_filhas && tarefa.tarefas_filhas.length > 0)
                        ">
                            --
                        </span>
                        <span v-else>
                            {{ tarefa.responsavel?.nome.split(' ')[0] }}
                        </span>
                    </p>
                </GanttLeftRow>
                <GanttLeftRow :index="index" class="text-center">
                    {{ format(tarefa.data_inicio, "P") }}
                </GanttLeftRow>
                <GanttLeftRow :index="index" class="text-center">
                    {{ format(tarefa.data_fim, "P") }}
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