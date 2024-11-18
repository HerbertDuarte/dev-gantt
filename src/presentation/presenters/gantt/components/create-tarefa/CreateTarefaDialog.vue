<script setup lang="ts">
import FormCreateTarefa from './FormCreateTarefa.vue';

</script>

<template>
    <q-dialog persistent ref="dialogRef" class="rounded-3xl">
        <q-card style="width: 90vw; max-width: 600px;">
            <div class="flex justify-between items-center bg-slate-100 p-2">
                <p class="font-medium text-base uppercase">Criação de tarefa</p>
                <q-btn flat dense round icon="close" class="text-slate-700" v-close-popup />
            </div>
            <div class="p-4">
                <FormCreateTarefa />
            </div>
        </q-card>
    </q-dialog>
</template>