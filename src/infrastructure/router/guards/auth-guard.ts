import { NavigationGuardNext } from 'vue-router';
import { useAuthStore } from '../../store/auth-store';

export function authGuard(next: NavigationGuardNext) {
    const authStore = useAuthStore();
    if (!authStore.isAuthenticated) {
        next({ path: 'login' });
        return;
    }
}
