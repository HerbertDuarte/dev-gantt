<script lang="ts" setup>
import { ref } from 'vue';
import { Tarefa } from '../../../../../domain/entities/tarefa';

defineProps<{
    tarefa: Tarefa
}>()

const comments = ref<string[]>(["Comentário aleatório 1", "Comentário aleatório 2", "Comentário aleatório 3"])
const newComment = ref('')

</script>

<template>
<hr class="my-6" />
<div class="mt-6">
    <div class="flex justify-between gap-2 text-slate-800 pb-4 uppercase ">
        <strong>
            <span>Comentários</span>
        </strong>
    </div>
    <div v-if="tarefa.usuariosTarefas.length > 0" class="space-y-1">
        <div class="" v-for="comment in comments">
            <div class="flex items-center space-x-1 flex-nowrap">
                <q-avatar class="q-mb-sm size-6 pt-1 flex-shrink-0">
                    <img :src="tarefa.usuariosTarefas[0].usuario.imageUrl" />
                </q-avatar>
                <p class="truncate flex-shrink text-slate-800">
                    <strong>{{ tarefa.usuariosTarefas[0].usuario.nome }}</strong>  {{ comment }}
                </p>
            </div>
        </div>
        <div class="flex gap-2 pt-6">
            <q-avatar class="q-mb-sm size-9 pt-px flex-shrink-0">
                    <img :src="tarefa.usuariosTarefas[0].usuario.imageUrl" />
                </q-avatar>
            <q-input placeholder="Escreva um comentário" dense class="flex-1 bg-slate-600/10 rounded-full px-4 h-10" borderless v-model="newComment"/>
        </div>
    </div>
</div>
</template>