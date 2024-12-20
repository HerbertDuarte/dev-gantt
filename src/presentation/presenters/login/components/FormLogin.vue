<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useFormLogin } from '../../../../infrastructure/store/form-login';

const form = useFormLogin();
const { password, username } = storeToRefs(form);
</script>

<template>
    <form @submit.prevent="form.submit()" class="flex flex-col max-w-[500px] w-full justify-start gap-4 p-4">
        <q-input class="inline flex-1 w-full" dense outlined placeholder="Digite seu login" v-model="username"
            type="text" required />
        <q-input class="inline flex-1 w-full" placeholder="Digite sua senha" outlined dense v-model="password"
            type="password" required />
        <q-btn type="submit" class="cti-button-dark">Entrar</q-btn>
    </form>
</template>
