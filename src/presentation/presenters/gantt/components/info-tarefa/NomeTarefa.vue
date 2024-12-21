<script setup lang="ts">
import { ref, watch } from 'vue';
import { Tarefa } from '../../../../../domain/entities/tarefa';

const props = defineProps<{
    tarefa: Tarefa
}>()

const editing = ref(false)
const tarefa = ref(props.tarefa)
const previourNome = props.tarefa.nome

function cancel(){
    tarefa.value.nome = previourNome
    editing.value = false
}

</script>
<template>
        <div class=" pb-7 flex-1 flex flex-row items-center justify-start gap-2">
            <q-icon size="28px" name="assignment" /> 
            <span class="uppercase cursor-pointer font-bold text-xl text-slate-800 py-2" @click="editing = true" v-if="!editing">{{ tarefa.nome }}</span>
            <div v-if="editing" class="flex flex-1 items-center gap-2 w-max mr-4">
                <q-input class="flex-1 ganttly-textarea font-bold text-xl text-slate-800" outlined dense v-model="tarefa.nome">
                    <template v-if="tarefa.nome" v-slot:append>
                        <q-icon name="close" @click.stop.prevent="cancel()" class="cursor-pointer" />
                    </template>
                </q-input>
                <!-- <q-btn size="10px" round icon="cancel" @click="cancel()" class="ganttly-button" /> -->
            </div>
        </div>
        
</template>