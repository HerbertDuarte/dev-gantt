<template>
    <q-dialog ref="dialogRef">
        <q-card class="sm:p-10 p-6 w-full">
            <p class="uppercase font-bold text-xl text-slate-800 pb-7">
                <q-icon size="28px" name=" edit" /> Editar Usuário
            </p>
            <FormUpdateUsuario :closeDialog="close" :update="true" />
        </q-card>
    </q-dialog>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import FormUpdateUsuario from './form/FormUpdateUsuario.vue';

const dialogRef = ref<any>(null);

function close() {
    dialogRef.value.hide();
}
</script>
