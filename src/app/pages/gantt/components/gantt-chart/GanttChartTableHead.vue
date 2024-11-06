<script setup lang="ts">
import { ProjetoDetails } from '../../../projeto/store/projeto.store';
defineProps<{
    dadosProjeto: ProjetoDetails
}>()
</script>

<template>
    <thead>
        <tr>
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
            <th class="border border-black" :key="day" v-for="day in dadosProjeto.duracaoProjetoExibicao">
                {{ day.toString().padStart(2, '0') }}
            </th>
        </tr>
    </thead>
</template>