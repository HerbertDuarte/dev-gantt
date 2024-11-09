<template>
    <thead class="uppercase">
        <tr class="bg-gray-100 h-8">
            <th class="border-r" v-if="periodo.diasDaPrimeiraSemana > 0"
                :colspan="getColSpan(periodo.diasDaPrimeiraSemana)">
                início
            </th>
            <th class="border-x" :key="week" v-for="week in periodo.qtdSemanasInteiras" colspan="7">
                semana {{ week }}
            </th>
            <th v-if="periodo.diasDaUltimaSemana > 0" :colspan="getColSpan(periodo.diasDaUltimaSemana)">
                fim
            </th>
        </tr>
        <tr class="bg-gray-200 h-10">
            <th :class="`border-x border-white min-w-[40px] ${fixDiaInicialFinalClass(index)}`"
                v-if="periodo.duracaoProjetoExibicao > 0" :key="index" v-for="(day, index) in periodo.dias">
                <div :class="`flex flex-col ${fimSemanaClass(day)}`">
                    <span>{{ (index + 1).toString().padStart(2, '0') }}</span>
                    <span>{{ obterSiglaDia(day) }}</span>
                </div>

            </th>
        </tr>
    </thead>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useGanttStore } from '../../../../../infrastructure/store/gantt.store';
import { storeToRefs } from 'pinia';
import { getPeriodoGantt } from '../../../projeto/utils/get-projeto-gantt';
import { Periodo } from '../../../../../domain/entities/periodo';
import { obterSiglaDia } from '../../../../../lib/date/get-sigla-dia-semana';
import { isSaturday, isSunday } from 'date-fns';
const { tarefas } = storeToRefs(useGanttStore());

const periodo = ref<Periodo>(new Periodo());

function getColSpan(value: number) {
    return value > 0 ? value : 1;
}

const fimSemanaClass = (day: Date) => {
    if (isSunday(day) || isSaturday(day)) {
        return "bg-blue-200/40"
    }
}

const fixDiaInicialFinalClass = (index: number) => {

    if (index === 0) {
        return "border-l-0"
    }

    if (index === periodo.value.dias.length - 1) {
        return "border-r-0"
    }

    return ""
}

onMounted(() => {
    periodo.value = getPeriodoGantt(tarefas.value);
});

</script>