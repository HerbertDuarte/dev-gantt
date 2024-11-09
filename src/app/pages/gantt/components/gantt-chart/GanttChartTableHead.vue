<template>
    <thead>
        <tr class="bg-gray-100 h-8">
            <th v-if="dadosProjeto.diasDaPrimeiraSemana > 0" :colspan="getColSpan(dadosProjeto.diasDaPrimeiraSemana)">
                início
            </th>
            <th :key="week" v-for="week in dadosProjeto.qtdSemanasInteiras" colspan="7">
                semana {{ week + 1 }}
            </th>
            <th v-if="dadosProjeto.diasDaUltimaSemana > 0" :colspan="getColSpan(dadosProjeto.diasDaUltimaSemana)">
                fim
            </th>
        </tr>
        <tr class="bg-gray-200 h-8">
            <th v-if="dadosProjeto.duracaoProjetoExibicao > 0" :key="day"
                v-for="day in dadosProjeto.duracaoProjetoExibicao">
                {{ day.toString().padStart(2, '0') }}
            </th>
        </tr>
    </thead>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { ProjetoDetails, Tarefa, useGanttStore } from '../../store/gantt.store';
import { storeToRefs } from 'pinia';
import { differenceInDays } from 'date-fns';
const { projeto, tarefas } = storeToRefs(useGanttStore());

const dadosProjeto = ref<ProjetoDetails>({
    duracaoProjetoExibicao: 16,
    diasDaUltimaSemana: 2,
    diasDaPrimeiraSemana: 0,
    qtdSemanasInteiras: 2,
})
function getDetails(): ProjetoDetails {
    if (!projeto.value) {
        return {
            duracaoProjetoExibicao: 16,
            diasDaUltimaSemana: 2,
            diasDaPrimeiraSemana: 0,
            qtdSemanasInteiras: 2,
        };
    }

    const duracaoProjetoExibicao = defineDuracaoProjeto(tarefas.value);
    const diasDaPrimeiraSemana = 2;
    const diasDaUltimaSemana = 0;
    const qtdSemanasInteiras = 2;

    return {
        duracaoProjetoExibicao,
        diasDaUltimaSemana,
        diasDaPrimeiraSemana,
        qtdSemanasInteiras,
    };
};

function defineDuracaoProjeto(tarefas: Tarefa[]) {
    return differenceInDays(
        tarefas[tarefas.length - 1].data_fim,
        tarefas[0].data_inicio) + 1;
}

function getColSpan(value: number) {
    return value > 0 ? value : 1;
}

onMounted(() => {
    dadosProjeto.value = getDetails();
});

</script>