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
        return "bg-slate-200/70 text-slate-800"
    }
}

onMounted(() => {
    periodo.value = getPeriodoGantt(tarefas.value);
});

</script>

<template>
    <thead class="uppercase sticky top-0 z-10">
        <tr class="bg-white h-gantt-row">
            <th class="custom-outline" v-if="periodo.diasDaPrimeiraSemana > 0"
                :colspan="getColSpan(periodo.diasDaPrimeiraSemana)">
                início
            </th>
            <th class="custom-outline" :key="week" v-for="week in periodo.qtdSemanasInteiras" colspan="7">
                semana {{ week }}
            </th>
            <th class="custom-outline" v-if="periodo.diasDaUltimaSemana > 0"
                :colspan="getColSpan(periodo.diasDaUltimaSemana)">
                fim
            </th>
        </tr>
        <tr class="bg-slate-100 h-10">
            <th :class="`min-w-[40px] custom-outline`" v-if="periodo.duracaoProjetoExibicao > 0" :key="index"
                v-for="(day, index) in periodo.dias">
                <div :class="`flex flex-col ${fimSemanaClass(day)}`">
                    <span>{{ (day.getDate()).toString().padStart(2, '0') }}</span>
                    <span>{{ obterSiglaDia(day) }}</span>
                </div>

            </th>
        </tr>
    </thead>
</template>
<style scoped>
.custom-outline {
    @apply outline outline-[1px] outline-slate-50;
}
</style>