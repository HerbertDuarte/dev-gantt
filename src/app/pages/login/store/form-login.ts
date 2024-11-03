import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useAuthStore } from '../../../auth/auth-store';
import { useRouter } from 'vue-router';

export const useFormLogin = defineStore('form-login', () => {
    const auth = useAuthStore();
    const router = useRouter();
    const username = ref('');
    const password = ref('');

    async function submit() {
        await auth.doLogin({
            username: username.value,
            password: password.value,
        });
        router.push({ name: 'home' });
    }

    return {
        username,
        password,
        submit,
    };
});
