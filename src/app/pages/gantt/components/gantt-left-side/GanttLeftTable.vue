<script setup lang="ts">
import { differenceInDays, format } from 'date-fns';
import { storeToRefs } from 'pinia';
import { useProjetoStore } from '../../../projeto/store/projeto.store';
import { StatusTarefa, useGanttStore } from '../../store/gantt.store';
const ganttStore = useGanttStore();
const projetoStore = useProjetoStore();
const { tarefas, marcos } = storeToRefs(ganttStore)
const { projeto } = storeToRefs(projetoStore)
const dadosProjeto = projetoStore.getDetails(tarefas.value);
</script>

<template>
    <div ref="tarefasTableRef" @scroll="" class="tarefas-table-container">
        <table class="tarefa-table">
            <thead>
                <tr>
                    <th colspan="6" class="tarefa-table-title">
                        {{ projeto?.nome }}
                    </th>
                </tr>
                <tr class="tarefa-tr">
                    <th>Tarefa</th>
                    <th>Responsável</th>
                    <th>Data início</th>
                    <th>Data final</th>
                    <th>Duração</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <tr :class="`tarefa-tr hover`" :key="tarefa.id" v-for="tarefa in tarefas">
                    <td>
                        <p :style="{ paddingLeft: `${tarefa.nivel * 16}px` }" class="tarefa-td-nome">
                            <q-tooltip anchor="center middle" self="center middle" class="text-white" :delay="1000">
                                {{ tarefa.num }} - {{ tarefa.nome }}</q-tooltip>
                            {{ tarefa.num }} - {{ tarefa.nome }}
                        </p>
                    </td>
                    <td>
                        <p class="tarefa-td-responsavel">
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

                        " class="status-td-content">
                            <p class="q-pa-none tarefa-status-label">{{ tarefa.status }}</p>
                        </div>
                        <div v-else class="status-td-content">
                            <SelectStatus @update-tarefa="" :tarefa="tarefa" />
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>