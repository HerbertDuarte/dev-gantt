<script setup lang="ts">
import { ref } from 'vue';
import { Tarefa } from '../../../../../domain/entities/tarefa';

const props = defineProps<{
    tarefa: Tarefa
}>()

const tarefa = ref(props.tarefa)
const previousDescricao = props.tarefa.descricao
const editing = ref(false)

function cancel(){
    tarefa.value.descricao = previousDescricao
    editing.value = false
}

</script>

<template>
<div
    class="flex justify-between gap-2 text-slate-800 pb-1 uppercase text-base">
    <strong>Descrição</strong>
    <div v-if="editing" class="space-x-2 pr-2">
        <q-btn size="10px" round icon="close" @click="cancel()" flat />
    </div>
</div>
<div v-if="editing">
    <q-input class="w-full ganttly-textarea" type="textarea" outlined v-model="tarefa.descricao"/>
</div>
<p v-if="!editing" @click="editing = true" class="text-slate-800 cursor-pointer">
    {{ tarefa.descricao }}
</p>
</template>