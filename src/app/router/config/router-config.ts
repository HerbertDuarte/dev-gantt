import { createRouter, createWebHistory } from 'vue-router';
import { UsuarioNivel } from '../../../entities/usuario';
import { routes } from '../routes';
import { authGuard } from '../guards/auth-guard';
import { roleGuard } from '../guards/role-guard';

export function routerConfig() {
    const router = createRouter({
        scrollBehavior: () => ({ left: 0, top: 0 }),
        routes: routes,
        history: createWebHistory('/'),
    });

    router.beforeEach(async (to, from, next) => {
        const roles = to.meta?.roles as UsuarioNivel[] | undefined;
        if (to.meta?.authGuard) {
            authGuard(next);
        } else if (roles) {
            roleGuard(from, next, roles);
        }
        next();
    });

    return router;
}
