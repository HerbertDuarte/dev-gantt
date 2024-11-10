<script setup lang="ts">
import { differenceInDays, format } from 'date-fns';
import { storeToRefs } from 'pinia';
import GanttLeftTableHead from './GanttLeftTableHead.vue';
import GanttLeftRow from './GanttLeftRow.vue';
import { useProjetoStore } from '../../../../../infrastructure/store/projeto.store';
import { useGanttStore } from '../../../../../infrastructure/store/gantt.store';
import { Tarefa } from '../../../../../domain/entities/tarefa';


const responsaveis = [
    {
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
        id: 1,
        nome: 'João'
    },
    {
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
        id: 2,
        nome: 'Maria'
    },
    {
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
        id: 3,
        nome: 'José'
    },
    {
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
        id: 4,
        nome: 'Maria'
    },

]

const reduzParaDois = (arr: any[]) => arr.slice(0, 2)
const possuiMaisDeDois = (arr: any[]) => arr.length > 2

const { tarefas } = storeToRefs(useGanttStore());
const { projeto } = storeToRefs(useProjetoStore());

function getDuration(tarefa: Tarefa) {
    return differenceInDays(tarefa.data_fim, tarefa.data_inicio) + 1
}

</script>

<template>
    <table v-if="projeto">
        <GanttLeftTableHead :projeto="projeto" />
        <tbody class="text-zinc-700">
            <tr :key="tarefa.id" v-for="(tarefa, index) in tarefas" class="h-9">
                <GanttLeftRow :index="index" class="text-left">
                    <p :style="{ paddingLeft: `${tarefa.nivel * 16}px` }">
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
                        {{ format(tarefa.data_inicio, "dd/MM/yyyy") }}
                    </div>
                </GanttLeftRow>
                <GanttLeftRow :index="index" class="text-center">
                    <div class="bg-slate-300 rounded-full text-slate-700 w-fit px-2.5 mx-auto">
                        {{ format(tarefa.data_fim, "dd/MM/yyyy") }}
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