<template>
    <main class="flex justify-center items-center">
        <TabelaUsuario />
    </main>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { getUsuarios } from '../../../../infrastructure/actions/usuario.actions';
import TabelaUsuario from './table/TabelaUsuario.vue';

onMounted(async () => {
    await getUsuarios();
});
</script>
