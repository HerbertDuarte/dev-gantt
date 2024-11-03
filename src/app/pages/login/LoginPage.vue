<script setup lang="ts">
import { storeToRefs } from 'pinia';
import packageJson from '../../../../package.json';
import FormLogin from './components/FormLogin.vue';
import { useAuthStore } from '../../auth/auth-store';
import { watch } from 'vue';
import { useRouter } from 'vue-router';
const auth = useAuthStore();
const { isAuthenticated } = storeToRefs(auth);
const router = useRouter();

watch(isAuthenticated, (value) => {
    if (value) {
        router.push('/home');
    }
});
</script>

<template>
    <main class="flex justify-center items-stretch h-dvh">
        <div class="flex-1 h-dvh bg-cover gt-sm inline" style="
                background-image: url('https://gantthub.pmvc.ba.gov.br/img/imagem-de-fundo.b0cba8ad.svg');
            "></div>
        <div class="p-10 flex-1 flex flex-col items-center justify-center">
            <img class="h-32 sm:h-40" src="images/logo.png" alt="logo pmvc" />
            <h1 class="text-xl sm:text-3xl py-10 font-bold text-slate-600">
                Dev Gantt
            </h1>
            <FormLogin />

            <p class="text-sm text-slate-500 pt-8">
                v{{ packageJson.version }}
            </p>
        </div>
    </main>
</template>
