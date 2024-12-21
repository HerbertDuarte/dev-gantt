<script lang="ts" setup>
import { ref, toRefs, watch } from 'vue';
import { Tarefa } from '../../../../../domain/entities/tarefa';
import ComentariosTarefa from './ComentariosTarefa.vue';
import CheckListTarefa from './CheckListTarefa.vue';
import DescricaoTarefa from './DescricaoTarefa.vue';
import RightSideInfoTarefa from './RightSideInfoTarefa.vue';
import NomeTarefa from './NomeTarefa.vue';

const props = defineProps<{
    tarefa: Tarefa
}>()
const changed = ref(false)
const tarefa = ref(props.tarefa)
const previousNome = props.tarefa.nome
const previousDescricao = props.tarefa.descricao
const previousCheckLists = props.tarefa.checkLists

tarefa.value.checkLists = [
    {id: "1", nome: "Módulo de usuários", itens: [
        {descricao: "Teste usecase criação de usuário", concluido: false, id: "1"},
        {descricao: "Teste usecase edição de usuário", concluido: false, id: "2"},
        {descricao: "Teste usecase exclusão de usuário", concluido: true, id: "3"},
    ]},

    {id: "2", nome: "Módulo de tarefas", itens: [
        {descricao: "Teste de arquivação de tarefas", concluido: false, id: "1"},
        {descricao: "Teste de criação de tarefas", concluido: false, id: "2"},
    ]},
]

watch(tarefa, ()=>{
    changed.value = true
    const mudou = tarefa.value.descricao != previousDescricao
        || tarefa.value.nome != previousNome 
        || JSON.stringify(tarefa.value.checkLists) != JSON.stringify(previousCheckLists)
    if(mudou){
    changed.value = true
    }
    else{
    changed.value = false
    }
}, {deep: true})

function save(){
    console.log("save",tarefa.value)
    changed.value = false
}

</script>

<template>
     <q-dialog ref="dialogRef" class="rounded-3xl">
        <q-card style="width: 1200px; max-width: 80vw;" class="sm:p-10 p-6 max-w-none">
            <div class="flex justify-between items-start">
                <NomeTarefa :tarefa="tarefa"/>
                <div class="space-x-2">
                    <q-btn @click="save()" v-if="changed" class="ganttly-button-dark" icon="save" round/>
                    <q-btn v-close-popup class="ganttly-button" icon="close" round/>
                </div>
            </div>
            <div class="flex gap-8">
                <div class="flex-1 min-w-[400px]">
                    <DescricaoTarefa :tarefa="tarefa" />
                    <CheckListTarefa :tarefa="tarefa" />
                    <ComentariosTarefa :tarefa="tarefa" />
                </div>
                <RightSideInfoTarefa :tarefa="tarefa" />
            </div>
        </q-card>
       
     </q-dialog>
</template>