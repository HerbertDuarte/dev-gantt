<script lang="ts" setup>
import { ref, toRefs } from 'vue';
import { Tarefa } from '../../../../../domain/entities/tarefa';
import { responsaveis } from '../../../../../infrastructure/store/fakedb';

const props = defineProps<{
    tarefa: Tarefa
}>()

const { tarefa } = toRefs(props)
const editing = ref(false)
const newComment = ref('')
const comments = ref<string[]>(["Comentário aleatório 1", "Comentário aleatório 2", "Comentário aleatório 3"])

tarefa.value.descricao =  "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem doloremque unde eligendi consequatur eius laborum, minus quidem molestiae sapiente aperiam accusantium, recusandae natus distinctio illo, ea laboriosam dignissimos quae itaque"

tarefa.value.checkLists = [
    {id: 1, nome: "Módulo de usuários", itens: [
        {descricao: "Teste usecase criação de usuário", concluido: false, id: 1},
        {descricao: "Teste usecase edição de usuário", concluido: false, id: 2},
        {descricao: "Teste usecase exclusão de usuário", concluido: true, id: 3},
    ]},

    {id: 2, nome: "Módulo de tarefas", itens: [
        {descricao: "Teste de arquivação de tarefas", concluido: false, id: 1},
        {descricao: "Teste de criação de tarefas", concluido: false, id: 2},
    ]},
]
</script>

<template>
     <q-dialog ref="dialogRef" class="rounded-3xl">
        <q-card style="width: 1200px; max-width: 80vw;" class="sm:p-10 p-6 max-w-none">
            <div class="flex justify-between items-start">
                <p class=" uppercase font-bold text-xl text-slate-800 pb-7">
                    <q-icon class="pb-1.5" size="28px" name="assignment" /> {{ tarefa.nome }}
                </p>
                <div class="space-x-2">
                    <q-btn class="bg-slate-700/10" icon="save" round/>
                    <q-btn v-close-popup class="bg-slate-700/10" icon="close" round/>
                </div>
            </div>
            <div class="flex gap-8">
                <div class="flex-1 min-w-[400px]">
                    <div
                     class="flex justify-between gap-2 text-slate-800 pb-1 uppercase text-base">
                        <strong>Descrição</strong>
                        <div v-if="editing" class="space-x-2 pr-2">
                            <q-btn size="10px" round icon="save" @click="editing = false" class="cti-button-dark"/>
                            <q-btn size="10px" round icon="close" @click="editing = false" class="cti-button" />
                        </div>
                    </div>
                    <div v-if="editing">
                        <q-input class="w-full cti-textarea" type="textarea" outlined v-model="tarefa.descricao"/>
                    </div>
                    <p v-if="!editing" @click="editing = true" class="text-slate-800 cursor-pointer">
                        {{ tarefa.descricao }}
                    </p>

                    <hr class="my-6" />

                    <div class="space-y-8">
                        <div v-for="checklist in tarefa.checkLists" :key="checklist.id" >
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

                    <hr class="my-6" />

                    <div class="mt-6">
                        <div class="flex justify-between gap-2 text-slate-800 pb-4 uppercase ">
                            <strong>
                                <span>Comentários</span>
                            </strong>
                        </div>
                        <div class="space-y-1">
                            <div class="" v-for="comment in comments">
                                <div class="flex items-center space-x-1 flex-nowrap">
                                    <q-avatar class="q-mb-sm size-6 pt-1 flex-shrink-0">
                                        <img :src="responsaveis[0].imageUrl" />
                                    </q-avatar>
                                    <p class="truncate flex-shrink text-slate-800">
                                        <strong>{{ responsaveis[0].nome }}</strong>  {{ comment }}
                                    </p>
                                </div>
                            </div>
                            <div class="flex gap-2 pt-6">
                                <q-avatar class="q-mb-sm size-9 pt-px flex-shrink-0">
                                        <img :src="responsaveis[0].imageUrl" />
                                    </q-avatar>
                                <q-input placeholder="Escreva um comentário" dense class="flex-1 bg-slate-600/10 rounded-full px-4 h-10" borderless v-model="newComment"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="min-w-3/12 space-y-4">
                    <div><p class="text-slate-800 pb-1 uppercase "><strong>Responsáveis</strong></p>
                        <div v-for="responsavel in responsaveis" :key="responsavel.nome" class="flex items-center space-x-2 flex-nowrap">
                            <q-avatar class="q-mb-sm size-6 pt-1 flex-shrink-0">
                                <img :src="responsavel.imageUrl" />
                            </q-avatar>
                            <p class="truncate flex-shrink max-w-[200px]">{{ responsavel.nome }}</p>
                        </div>
                    </div>

                    <p class="text-slate-800 pb-1 uppercase "><strong>Opções</strong></p>

                    <div class="flex flex-col gap-2">
                        <q-btn icon="people" class="cti-button-ghost flex items-start" label="Responsáveis" />
                        <q-btn icon="checklist" class="cti-button-ghost flex items-start" label="Checklist" />
                        <q-btn icon="file_present" class="cti-button-ghost flex items-start" label="Anexo" />
                        <q-btn icon="remove" class="cti-button-ghost flex items-start" label="Arquivar" />
                        <q-btn icon="share" class="cti-button-ghost flex items-start" label="Compartilhar" />
                    </div>

                </div>
            </div>
        </q-card>
       
     </q-dialog>
</template>