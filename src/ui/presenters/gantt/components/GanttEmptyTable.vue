<script setup lang="ts">
import { Marco } from '../../../../domain/entities/marco';
import { Projeto } from '../../../../domain/entities/projeto';

defineProps<{
    projeto: Projeto,
    marcos: Marco[]
}>()
</script>
<template>
    <p v-if="projeto && marcos.length === 0">
        <b>Nenhuma</b> tarefa foi registrada no projeto
        <b>{{ projeto.nome }}</b>.
    </p>
    <p v-if="projeto && marcos.length > 0">
        {{ marcos.length > 1 ? 'Existem' : 'Existe' }}
        <b>
            <q-tooltip class="bg-blue-9 text-white text-lg" :delay="1000">
                <p class="q-ma-none" :key="index" v-for="(marco, index) in marcos">
                    {{ marco.nome }}
                </p>
            </q-tooltip>
            {{ marcos.length }} {{ marcos.length > 1 ? 'marcos' : 'marco' }}
        </b>
        {{ marcos.length > 1 ? 'registrados' : 'registrado' }} no projeto,
        porém <b>nenhuma</b> tarefa foi registrada no projeto
        <b>{{ projeto.nome }}</b>.
    </p>
</template>