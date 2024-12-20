<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useFormLogin } from '../../../../infrastructure/store/form-login';
import { RouterLink } from 'vue-router';
const form = useFormLogin();
const { password, username } = storeToRefs(form);
</script>

<template>
    <form @submit.prevent="form.submit()" class="flex flex-col w-full justify-start gap-4 p-2">
        <q-input class="inline flex-1 w-full" dense label="Username *" outlined v-model="username"
            type="text" required />
        <q-input class="inline flex-1 w-full" label="Senha *" outlined dense v-model="password"
            type="password" required />
        <div class="text-right">
            <RouterLink class="hover:underline text-sky-700" to="">Esqueci minha senha</RouterLink>
        </div>
        <q-btn type="submit" class="cti-button-dark">Entrar</q-btn>
        <hr>
        <q-btn type="submit" class="cti-button-ghost">
            <span class="flex items-center gap-2">
                <img class="size-5" src="images/google-icon.png" alt="google icon">
                <span>Entrar com o Google</span>
            </span>
        </q-btn>

        <p class="pt-2">Não possui conta? <RouterLink class="hover:underline text-sky-700" to="">Registre-se.</RouterLink></p>
    </form>
</template>
