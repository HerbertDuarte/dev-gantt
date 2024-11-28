<script setup lang="ts">
import FormCreateTarefa from './FormCreateTarefa.vue';

</script>

<template>
    <q-dialog persistent ref="dialogRef" class="rounded-3xl">
        <q-card class="sm:p-10 p-6 w-full">
            <p class="uppercase font-bold text-xl text-slate-800 pb-7">
                <q-icon class="pb-1.5" size="28px" name="post_add" /> Adicionar tarefa
            </p>
            <FormCreateTarefa />
        </q-card>
    </q-dialog>
</template>