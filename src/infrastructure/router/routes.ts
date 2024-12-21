import { tabRoutes } from './routes/tab-routes';
import { commonRoutes } from './routes/common.routes';
import { Route } from './config/route.interface';

export const routes: Route[] = [...tabRoutes, ...commonRoutes];

const blackListRoutes = ['404', 'login'];

export const usableRoutes = routes.filter(
    (route) => !blackListRoutes.includes(route.name),
);
