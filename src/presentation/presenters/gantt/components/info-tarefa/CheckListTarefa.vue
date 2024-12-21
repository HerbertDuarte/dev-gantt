<script lang="ts" setup>
import { ref, toRefs, watch } from 'vue';
import { Tarefa } from '../../../../../domain/entities/tarefa';

const props = defineProps<{
    tarefa: Tarefa
}>();

const tarefaRef = ref(props.tarefa)

</script>

<template>
<hr class="my-6" />
<div class="space-y-8">
    <div v-for="checklist in tarefaRef.checkLists" :key="checklist.id" >
        <div class="flex justify-between gap-2 text-slate-800 pb-1 uppercase ">
            <strong>
                <q-icon class="pr-1" size="22px" name="list"/>
                <span>{{ checklist.nome }}</span>
            </strong>
        </div>
        <div v-for="item in checklist.itens" :key="item.id" class="flex items-center">
            <q-checkbox dense class="p-1" v-model="item.concluido" />
            <p :class="{'line-through': item.concluido}" class="text-slate-800">{{ item.descricao }}</p>
        </div>
    </div>
</div>
</template>