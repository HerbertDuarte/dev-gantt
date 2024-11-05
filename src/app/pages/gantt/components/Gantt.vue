<template>
    <div v-if="tarefas && tarefas.length > 0" class="tables-container">

        <div ref="ganttTableRef" @scroll="" class="gantt-table-container">
            <table class="gantt-table">
                <thead>
                    <tr>
                        <th class="week-title" v-if="dadosProjeto.diasDaPrimeiraSemana > 0"
                            :colspan="dadosProjeto.diasDaPrimeiraSemana">
                            início
                        </th>
                        <th :key="week" v-for="week in dadosProjeto.qtdSemanasInteiras" colspan="7" class="week-title">
                            semana {{ week + 1 }}
                        </th>
                        <th class="week-title" v-if="dadosProjeto.diasDaUltimaSemana > 0"
                            :colspan="dadosProjeto.diasDaUltimaSemana">
                            fim
                        </th>
                    </tr>
                    <tr>
                        <th :key="day" v-for="day in dadosProjeto.duracaoProjetoExibicao">
                            {{ day.toString().padStart(2, '0') }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr :key="tarefaIndex" v-for="(tarefa, tarefaIndex) in tarefas" :class="`size-4`">
                        <td v-for="diaDeProjeto in getListaDias(tarefas[0].data_inicio, tarefa.data_fim)">
                            <div v-if="diaDeProjeto < tarefa.data_inicio" class="empty-space"></div>
                            <div v-else :class="`size-4 bg-${colorClass(tarefa.status)}`">{{
                                }}</div>
                        </td>
                    </tr>
                </tbody>
            </table>
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
<script setup lang="ts">
import { differenceInDays, format } from 'date-fns';
import { StatusTarefa, useGanttStore } from '../store/gantt.store';
import { storeToRefs } from 'pinia';
import { colorClass } from '../utils/color-class';
import { useProjetoStore } from '../../projeto/store/projeto.store';
import { getListaDias } from '../utils/get-lista-dias';
const ganttStore = useGanttStore();
const projetoStore = useProjetoStore();
const { tarefas, marcos } = storeToRefs(ganttStore)
const { projeto } = storeToRefs(projetoStore)
const dadosProjeto = projetoStore.getDetails(tarefas.value);

</script>