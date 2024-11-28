<template>
    <div class="flex w-full gap-2">
        <q-input label="Pesquisar" class="inline flex-1" dense outlined v-model="busca"
            placeholder="Digite o nome ou email do usuário" />
        <q-btn flat icon="search" @click="getUsuarios" />
    </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { getUsuarios } from '../../../../../infrastructure/actions/usuario.actions';
import { useUsuarioStore } from '../../../../../infrastructure/store/usuario.store';
const usuarioStore = useUsuarioStore();
const { busca } = storeToRefs(usuarioStore);
</script>
