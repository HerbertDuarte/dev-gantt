<script setup lang="ts">
import { asTarefa, asTarefas, Ganttable } from '../../../../../../domain/aggregates/ganttable';
import { getListaDias } from '../../../utils/get-lista-dias';
import { colorClass } from '../../../stylesheets/color-class';
import { ganttBorder } from '../../../stylesheets/gantt-border-class';
import { roundedClass } from '../../../stylesheets/gantt-rounded-class';
import { isPrimeiroDiaPreenchidoClass } from '../../../stylesheets/primeiro-dia-border-class';
import { devePreencherTarefa } from '../../../stylesheets/deve-preencher';
defineProps<{
    ganttable: Ganttable,
    ganttables: Ganttable[],
    index: number
}>();
</script>

<template>
    <tr class="p-0" clickable>
        <td :class="` h-gantt-row p-0 ${index % 2 === 0 ? 'bg-white' : 'bg-slate-100'}`" v-for="diaDeProjeto in
            getListaDias(asTarefas(ganttables)[0].dataInicio,
                asTarefas(ganttables)[asTarefas(ganttables).length - 1].dataFim)">

            <div v-if="devePreencherTarefa(diaDeProjeto, ganttable)"
                :class="`h-full py-1 ${isPrimeiroDiaPreenchidoClass(diaDeProjeto, ganttable)}`">
                <div
                    :class="`h-full bg-${colorClass(asTarefa(ganttable))}/50 ${roundedClass(diaDeProjeto, ganttable)}`" />
            </div>
            <div :class="`h-full ${ganttBorder(diaDeProjeto)}`" v-else />

        </td>
    </tr>
</template>