import { RouteRecordRaw } from 'vue-router';
import { tabRoutes } from './routes/tab-routes';
import { commonRoutes } from './routes/common.routes';
import { usuarioRoutes } from './routes/usuario.routes';
import { Route } from './config/route.interface';

export const routes: Route[] = [
    ...tabRoutes,
    ...commonRoutes,
    ...usuarioRoutes,
];

const blackListRoutes = ['404', 'login'];

export const usableRoutes = routes.filter(
    (route) => !blackListRoutes.includes(route.name),
);
