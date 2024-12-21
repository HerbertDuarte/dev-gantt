import { Route } from '../config/route.interface';

interface Tab extends Route {
    title: string;
}

export const tabRoutes: Route[] = [
    {
        path: '/',
        component: () =>
            import('../../../presentation/presenters/home/HomePage.vue'),

        name: 'home',
        meta: {
            authGuard: true,
            breadcrumb: [
                {
                    path: '/',
                    title: 'Início',
                },
            ],
            icon: 'home',
            label: 'Tela inicial',
        },
    },
    {
        path: '/gantt',
        component: () =>
            import(
                '../../../presentation/presenters/gantt/components/Gantt.vue'
            ),
        meta: {
            breadcrumb: [
                {
                    path: '/gantt',
                    title: 'Gantt',
                },
            ],
            label: 'Gráfico de Gantt',
            icon: 'graphic_eq',
        },
        name: 'gantt',
    },
];
