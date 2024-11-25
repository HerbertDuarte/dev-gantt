import { createRouter, createWebHistory } from 'vue-router';
import { routes } from '../routes';
import { authGuard } from '../guards/auth-guard';

export function routerConfig() {
    const router = createRouter({
        scrollBehavior: () => ({ left: 0, top: 0 }),
        routes: routes,
        history: createWebHistory('/'),
    });

    router.beforeEach(async (to, from, next) => {
        if (to.meta?.authGuard) {
            authGuard(next);
        }
        next();
    });

    return router;
}
