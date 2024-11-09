import { Route } from '../config/route.interface';

export const commonRoutes: Route[] = [
    {
        path: '/login',
        name: 'login',
        component: () => import('../../../ui/presenters/login/LoginPage.vue'),
        meta: {
            icon: 'signin',
            breadcrumb: [],
            label: '',
        },
    },
    {
        path: '/perfil',
        name: 'perfil',
        component: () => import('../../../ui/presenters/perfil/PerfilPage.vue'),
        children: [],
        meta: {
            authGuard: true,
            icon: 'person',
            breadcrumb: [
                {
                    path: '/perfil',
                    title: 'Perfil',
                },
                {
                    path: '/perfil',
                    title: 'meus dados',
                },
            ],
            label: 'Meus dados',
        },
    },
    {
        path: '/:catchAll(.*)',
        name: '404',
        component: () =>
            import('../../../ui/presenters/404/PaginaNaoEncontrada.vue'),
        meta: {
            icon: 'error',
            breadcrumb: [],
            label: '',
        },
    },
];
