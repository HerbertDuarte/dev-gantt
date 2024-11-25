import { defineStore } from 'pinia';
import { api } from '../boot/axios';
import { Loading, QSpinnerBall } from 'quasar';
import { ref } from 'vue';
import { Usuario } from '../../domain/entities/usuario';
import { notifyError } from '../../lib/ui/notify/notify-error';
import { notifySuccess } from '../../lib/ui/notify/notify-success';
import { useRouter } from 'vue-router';

export type LoginPayload = {
    username: string;
    password: string;
};

type LoginResponse = {
    access_token: string;
    usuarioId: string;
};

export const useAuthStore = defineStore('auth', () => {
    const router = useRouter();
    const user = ref<Usuario | null>();
    const token = ref<string | null>();
    const isAuthenticated = ref(false);
    const isAdmin = ref(false);
    const loadingProps = {
        message: 'Entrando em contato com servidor...',
        delay: 400,
        spinner: QSpinnerBall,
        spinnerColor: 'blue-10',
        spinnerSize: 140,
    };

    async function doLogin(payload: LoginPayload) {
        Loading.show(loadingProps);
        try {
            const response = await api.post<LoginResponse>(
                '/auth/login',
                payload,
            );
            setToken(response.data.access_token);
            getUser(response.data.usuarioId);
            if (response.data.access_token) {
                notifySuccess({ message: 'Login efetuado com sucesso' });
            }
        } catch (error: any) {
            notifyError({ error });
        } finally {
            Loading.hide();
        }
    }

    function setToken(strToken: string) {
        api.defaults.headers.common.Authorization = 'Bearer ' + strToken;
        token.value = strToken;
        isAuthenticated.value = true;
        window.localStorage.setItem('token', token.value);
    }

    function setUser(usuario: Usuario) {
        user.value = usuario;
        if (usuario.id) {
            window.localStorage.setItem('user_id', usuario.id);
            window.localStorage.setItem('name_user', usuario.nome);
        }
    }

    function removeToken() {
        token.value = '';
        isAuthenticated.value = false;
        window.localStorage.removeItem('token');
    }

    function removeUser() {
        user.value = null;
        window.localStorage.removeItem('user_id');
        window.localStorage.removeItem('name_user');
    }

    function removeAccessLevel() {
        isAdmin.value = false;
        window.localStorage.removeItem('access_level');
    }

    async function initSystem() {
        try {
            const token = window.localStorage.getItem('token');
            const userId = window.localStorage.getItem('user_id');

            if (token) {
                setToken(token);
            } else {
                removeToken();
            }

            if (userId) await getUser(userId);
        } catch (error) {
            logout();
        }
    }

    async function getUser(id: string) {
        const { data } = await api.get<Usuario>(`usuarios/${id}`);
        setUser(data);
        return data;
    }

    async function logout() {
        api.defaults.headers.common.Authorization = '';
        removeUser();
        removeToken();
        removeAccessLevel();
    }

    return {
        doLogin,
        initSystem,
        getUser,
        logout,
        user,
        token,
        isAuthenticated,
        isAdmin,
    };
});
