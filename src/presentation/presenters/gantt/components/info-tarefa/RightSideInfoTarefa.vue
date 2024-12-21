<script lang="ts" setup>
import { Tarefa } from '../../../../../domain/entities/tarefa';

defineProps<{
    tarefa: Tarefa
}>()
</script>

<template>
    <div class="min-w-3/12 space-y-4">
        <div>
            <p class="text-slate-800 pb-1 uppercase">
                <strong>Responsáveis</strong>
            </p>
            <div v-if="tarefa.usuariosTarefas.length  === 0" >
                <p class="py-2 pl-2 text-slate-600 text-xs">Nenhuma atribuição</p>
            </div>
            <div  
                v-for="ut in tarefa.usuariosTarefas" 
                :key="ut.usuario.nome" 
                class="flex items-center space-x-2 flex-nowrap"
                >
                <q-avatar class="q-mb-sm size-6 pt-1 flex-shrink-0">
                    <img :src="ut.usuario.imageUrl" />
                </q-avatar>
                <p class="truncate flex-shrink max-w-[200px]">{{ ut.usuario.nome }}</p>
            </div>
        </div>

        <p class="text-slate-800 pb-1 uppercase "><strong>Opções</strong></p>

        <div class="flex flex-col gap-2">
            <q-btn icon="people" class="ganttly-button-ghost flex items-start" label="Responsáveis" />
            <q-btn icon="checklist" class="ganttly-button-ghost flex items-start" label="Checklist" />
            <q-btn icon="file_present" class="ganttly-button-ghost flex items-start" label="Anexo" />
            <q-btn icon="remove" class="ganttly-button-ghost flex items-start" label="Arquivar" />
            <q-btn icon="share" class="ganttly-button-ghost flex items-start" label="Compartilhar" />
        </div>

    </div>
</template>