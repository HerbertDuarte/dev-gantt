<script setup lang="ts">
import { differenceInDays, format } from 'date-fns';
import { storeToRefs } from 'pinia';
import { Projeto, useProjetoStore } from '../../../projeto/store/projeto.store';
import { StatusTarefa, useGanttStore } from '../../store/gantt.store';
import GanttLeftTableHead from './GanttLeftTableHead.vue';
import { Ref } from 'vue';
const ganttStore = useGanttStore();
const projetoStore = useProjetoStore();
const { tarefas } = storeToRefs(ganttStore)
const { projeto } = storeToRefs(projetoStore)
</script>

<template>

    <table v-if="projeto" class="border-collapse border border-slate-500">
        <GanttLeftTableHead :projeto="projeto" />
        <GanttLeftTableHead :projeto="projeto" />
        <tbody>
            <tr class="border-collapse border border-slate-500" :key="tarefa.id" v-for="tarefa in tarefas">
                <td>
                    <p :style="{ paddingLeft: `${tarefa.nivel * 16}px` }">
                        <q-tooltip anchor="center middle" self="center middle" :delay="1000">
                            {{ tarefa.num }} - {{ tarefa.nome }}</q-tooltip>
                        {{ tarefa.num }} - {{ tarefa.nome }}
                    </p>
                </td>
                <td>
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
                </td>
                <td>
                    {{ format(tarefa.data_inicio, "P") }}
                </td>
                <td>
                    {{ format(tarefa.data_fim, "P") }}
                </td>
                <td>
                    {{ `${differenceInDays(tarefa.data_fim, tarefa.data_fim)}
                    ${differenceInDays(tarefa.data_fim, tarefa.data_fim) > 1 ? 'dias' : 'dia'}` }}
                </td>
                <td>
                    <div v-if="
                        (tarefa.tarefas_filhas && tarefa.tarefas_filhas.length > 0)

                    ">
                        <p>{{ tarefa.status }}</p>
                    </div>
                    <div v-else>
                        <SelectStatus @update-tarefa="" :tarefa="tarefa" />
                    </div>
                </td>
            </tr>
        </tbody>
    </table>

</template>