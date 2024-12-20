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
    <main class="flex flex-col items-center justify-center h-dvh">
            <img class="size-36" src="images/logo.png" alt="Logo" />
            <FormLogin />
    </main>
</template>
