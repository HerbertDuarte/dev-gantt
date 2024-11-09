<template>
    <thead>
        <tr class="bg-gray-100 h-8">
            <th v-if="periodo.diasDaPrimeiraSemana > 0" :colspan="getColSpan(periodo.diasDaPrimeiraSemana)">
                início
            </th>
            <th :key="week" v-for="week in periodo.qtdSemanasInteiras" colspan="7">
                semana {{ week + 1 }}
            </th>
            <th v-if="periodo.diasDaUltimaSemana > 0" :colspan="getColSpan(periodo.diasDaUltimaSemana)">
                fim
            </th>
        </tr>
        <tr class="bg-gray-200 h-8">
            <th v-if="periodo.duracaoProjetoExibicao > 0" :key="day" v-for="day in periodo.duracaoProjetoExibicao">
                {{ day.toString().padStart(2, '0') }}
            </th>
        </tr>
    </thead>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { ProjetoDetails, useGanttStore } from '../../store/gantt.store';
import { storeToRefs } from 'pinia';
import { getPeriodoGantt } from '../../../projeto/utils/get-projeto-gantt';
const { tarefas } = storeToRefs(useGanttStore());

const periodo = ref<ProjetoDetails>({
    duracaoProjetoExibicao: 0,
    diasDaUltimaSemana: 0,
    diasDaPrimeiraSemana: 0,
    qtdSemanasInteiras: 0,
})

function getColSpan(value: number) {
    return value > 0 ? value : 1;
}

onMounted(() => {
    periodo.value = getPeriodoGantt(tarefas.value);
});

</script>