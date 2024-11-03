import { NavigationGuardNext } from 'vue-router';
import { useAuthStore } from '../../auth/auth-store';

export function authGuard(next: NavigationGuardNext) {
    const authStore = useAuthStore();
    if (!authStore.isAuthenticated) {
        next({ path: 'login' });
        return;
    }
}
