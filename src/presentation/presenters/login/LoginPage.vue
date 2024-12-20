<script setup lang="ts">
import { storeToRefs } from 'pinia';
import packageJson from '../../../../package.json';
import FormLogin from './components/FormLogin.vue';
import { useAuthStore } from '../../../infrastructure/store/auth-store';
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
    <main class="flex items-center justify-center h-dvh bg-slate-100">
        <div class="flex items-stretch justify-center w-full max-w-[1000px] bg-white rounded-lg shadow-md overflow-hidden">
            <div class="bg-slate-200 gap-6 p-4 flex-1 flex flex-col items-center justify-center">
                <div class="w-full text-xs">
                    <p class="text italic px-2">Organize suas demandas e projetos da melhor forma.</p>
                    <p class="text italic px-2">Acompanhe a performance da sua equipe.</p>
                    <p class="text italic px-2">Reuna as documentações e refências dos seus projetos.</p>
                    <p class="text italic px-2">Tudo isso em um só lugar.</p>
                </div>
                <img class="flex-1" src="images/illustration-1.svg" alt="Logo" />
            </div>
            <div class="flex flex-1 max-w-[400px] flex-col items-start justify-center p-5">
                <div class="flex items-center justify-center gap-2 pb-6">
                    <img class="size-5" src="images/logo.png" alt="Logo" />
                    <span class="text-md font-medium text-slate-600">Ganttly</span>
                </div>
                <div class=" pb-4">
                    <h1 class="text-2xl font-semibold text-slate-700 text-left">Seja bem vindo!</h1>
                    <p class="text-xs">Sua experiência é nossa prioridade!</p>
                </div>
                <FormLogin />
            </div>
        </div>
    </main>
</template>
