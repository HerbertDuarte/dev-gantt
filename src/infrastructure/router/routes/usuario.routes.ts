import { Route } from '../config/route.interface';

export const usuarioRoutes: Route[] = [
    {
        path: '/usuario/cadastro',
        component: () =>
            import(
                '../../../ui/presenters/usuarios/components/CreateUsuarioView.vue'
            ),
        meta: {
            label: 'Cadastro de usuário',
            breadcrumb: [
                {
                    path: '/usuario',
                    title: 'usuários',
                },
                {
                    path: '/usuario/cadastro',
                    title: 'cadastro',
                },
            ],
            icon: 'person_add',
        },
        name: 'usuario-cadastro',
    },
];
