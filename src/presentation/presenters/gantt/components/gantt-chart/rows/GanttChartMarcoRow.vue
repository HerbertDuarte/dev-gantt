<script setup lang="ts">
import { isSameDay, isSunday } from 'date-fns';
import { asMarco, asTarefas, Ganttable, isMarco } from '../../../../../../domain/aggregates/ganttable';
import { Marco } from '../../../../../../domain/entities/marco';
import { getListaDias } from '../../../utils/get-lista-dias';
import { ganttBorder } from '../../../stylesheets/gantt-border-class';
import { roundedClass } from '../../../stylesheets/gantt-rounded-class';
import { isPrimeiroDiaPreenchidoClass } from '../../../stylesheets/primeiro-dia-border-class';
import { devePreencherMarco } from '../../../stylesheets/deve-preencher';

const {ganttable} = defineProps<{
    ganttable: Ganttable,
    ganttables: Ganttable[],
    index: number
}>();

console.log(ganttable);

</script>

<template>
    <tr v-if="isMarco(ganttable)" class="p-0">
        <td :class="`h-gantt-row  p-0 ${index % 2 === 0 ? 'bg-white' : 'bg-slate-100'}`" v-for="diaDeProjeto in
            getListaDias(asTarefas(ganttables)[0].dataInicio,
                asTarefas(ganttables)[asTarefas(ganttables).length - 1].dataFim)">
            <div v-if="devePreencherMarco(diaDeProjeto, ganttable)"
                :class="`py-1 h-full ${isPrimeiroDiaPreenchidoClass(diaDeProjeto, ganttable)}`">
                <div :class="`h-full bg-black/60 ${roundedClass(diaDeProjeto, ganttable)}`" />
            </div>
            <div v-else :class="`h-full ${ganttBorder(diaDeProjeto)}`" />
        </td>
    </tr>
</template>