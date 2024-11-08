import {
    RouteLocationNormalizedLoadedGeneric,
    NavigationGuardNext,
} from 'vue-router';
import { UsuarioNivel } from '../../../entities/usuario';
import { notifyError } from '../../../lib/ui/notify/notify-error';
import { useAuthStore } from '../../auth/auth-store';

export function roleGuard(
    from: RouteLocationNormalizedLoadedGeneric,
    next: NavigationGuardNext,
    roles: UsuarioNivel[],
) {
    const authStore = useAuthStore();
    if (!authStore.user?.nivel || !roles.includes(authStore.user?.nivel)) {
        notifyError({
            message: 'Você não tem permissão para acessar essa página',
        });
        next({ path: from.path });
    }
}
