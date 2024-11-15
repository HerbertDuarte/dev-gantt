<script setup lang="ts">
import { differenceInDays, format } from 'date-fns';
import { storeToRefs } from 'pinia';
import GanttLeftTableHead from './GanttLeftTableHead.vue';
import GanttLeftRow from './GanttLeftRow.vue';
import { useProjetoStore } from '../../../../../infrastructure/store/projeto.store';
import { useGanttStore } from '../../../../../infrastructure/store/gantt.store';
import { Tarefa } from '../../../../../domain/entities/tarefa';
import { responsaveis } from '../../../../../infrastructure/store/fakedb';



const reduzParaDois = (arr: any[]) => arr.slice(0, 2)
const possuiMaisDeDois = (arr: any[]) => arr.length > 2

const { tarefas } = storeToRefs(useGanttStore());
const { projeto } = storeToRefs(useProjetoStore());

function getDuration(tarefa: Tarefa) {
    return differenceInDays(tarefa.dataFim, tarefa.dataInicio) + 1
}

</script>

<template>
    <table v-if="projeto">
        <GanttLeftTableHead :projeto="projeto" />
        <tbody class="text-zinc-700">
            <tr :key="tarefa.id" v-for="(tarefa, index) in tarefas" class="h-9">
                <GanttLeftRow :index="index" class="text-left">
                    <p class="pl-10">
                        {{ tarefa.nome }}
                    </p>
                </GanttLeftRow>
                <GanttLeftRow :index="index" class="flex justify-center items-center h-9 gap-1">
                    <q-avatar class="q-mb-sm size-6 pt-1" v-for="responsavel in reduzParaDois(responsaveis)">
                        <img :src="responsavel.imageUrl" />
                    </q-avatar>
                    <p v-if="possuiMaisDeDois(responsaveis)">+{{ responsaveis.length - 2 }}</p>
                </GanttLeftRow>
                <GanttLeftRow :index="index" class="text-center">
                    <div class="bg-slate-300 rounded-full text-slate-700 w-fit px-2.5 mx-auto">
                        {{ format(tarefa.dataInicio, "dd/MM/yyyy") }}
                    </div>
                </GanttLeftRow>
                <GanttLeftRow :index="index" class="text-center">
                    <div class="bg-slate-300 rounded-full text-slate-700 w-fit px-2.5 mx-auto">
                        {{ format(tarefa.dataFim, "dd/MM/yyyy") }}
                    </div>
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