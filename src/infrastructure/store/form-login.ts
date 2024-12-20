import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useAuthStore } from './auth-store';
import { useRouter } from 'vue-router';
import { Loading } from 'quasar';
import { notifyError } from '../../lib/ui/notify/notify-error';

export const useFormLogin = defineStore('form-login', () => {
    const auth = useAuthStore();
    const router = useRouter();
    const username = ref('');
    const password = ref('');

    async function submit() {
        Loading.show();
        try {
            await auth.doLogin({
                username: username.value,
                password: password.value,
            });
            router.push({ name: 'home' });
        } catch (error) {
            notifyError({ error });
        }
        Loading.hide();
    }

    return {
        username,
        password,
        submit,
    };
});
