<script setup lang="ts">
import { differenceInDays, format } from 'date-fns';
import { storeToRefs } from 'pinia';
import { useProjetoStore } from '../../../projeto/store/projeto.store';
import { StatusTarefa, Tarefa, useGanttStore } from '../../store/gantt.store';
import { getListaDias } from '../../utils/get-lista-dias';
import { colorClass } from '../../utils/color-class';
const ganttStore = useGanttStore();
const projetoStore = useProjetoStore();
const { tarefas, marcos } = storeToRefs(ganttStore)
const { projeto } = storeToRefs(projetoStore)
const dadosProjeto = projetoStore.getDetails(tarefas.value);

const devePreencher = (diaDeProjeto: Date, tarefa: Tarefa) => {
    return diaDeProjeto >= tarefa.data_inicio && diaDeProjeto <= tarefa.data_fim;
}

</script>

<template>
    <table class="border-collapse border border-slate-500 border-spacing-0">
        <thead>
            <tr class="border border-black">
                <th class="border border-black" v-if="dadosProjeto.diasDaPrimeiraSemana > 0"
                    :colspan="dadosProjeto.diasDaPrimeiraSemana">
                    início
                </th>
                <th :key="week" v-for="week in dadosProjeto.qtdSemanasInteiras" colspan="7" class="border border-black">
                    semana {{ week + 1 }}
                </th>
                <th class="border border-black" v-if="dadosProjeto.diasDaUltimaSemana > 0"
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
        <tbody class="border border-black">
            <tr class="border border-black" :key="tarefaIndex" v-for="(tarefa, tarefaIndex) in tarefas">
                <td class="p-0"
                    v-for="diaDeProjeto in getListaDias(tarefas[0].data_inicio, tarefas[tarefas.length - 1].data_fim)">
                    <div v-if="!devePreencher(diaDeProjeto, tarefa)"></div>
                    <div v-else :class="`h-6 bg-${colorClass(tarefa.status)}`"></div>
                </td>
            </tr>
        </tbody>
    </table>

</template>