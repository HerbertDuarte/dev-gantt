<script setup lang="ts">
// import { onMounted } from 'vue';
import MainLayout from './layout/components/MainLayout.vue';
import { useAuthStore } from './auth/auth-store';
import { onMounted, ref } from 'vue';
const auth = useAuthStore();
// onMounted(async () => {
//     await auth.initSystem();
// });
const isLoading = ref(true)
onMounted(() => {
    setTimeout(() => {
        isLoading.value = false
    }, 1500)
})  
</script>

<template>
    <MainLayout v-show="auth.isAuthenticated">
        <router-view />
    </MainLayout>

    <router-view v-show="!auth.isAuthenticated" />

</template>
