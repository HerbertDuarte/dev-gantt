<script setup lang="ts">
import { ProjetoDetails } from '../../../projeto/store/projeto.store';
defineProps<{
    dadosProjeto: ProjetoDetails
}>()
</script>

<template>
    <thead>
        <tr class="bg-gray-100 h-8">
            <th v-if="dadosProjeto.diasDaPrimeiraSemana > 0" :colspan="dadosProjeto.diasDaPrimeiraSemana">
                início
            </th>
            <th :key="week" v-for="week in dadosProjeto.qtdSemanasInteiras" colspan="7">
                semana {{ week + 1 }}
            </th>
            <th v-if="dadosProjeto.diasDaUltimaSemana > 0" :colspan="dadosProjeto.diasDaUltimaSemana">
                fim
            </th>
        </tr>
        <tr class="bg-gray-200 h-8">
            <th :key="day" v-for="day in dadosProjeto.duracaoProjetoExibicao">
                {{ day.toString().padStart(2, '0') }}
            </th>
        </tr>
    </thead>
</template>