import { UsuarioNivel } from '../../../domain/enum/usuario-nivel.enum';

type ShortRoute = {
    path: string;
    title: string;
};
export interface Route {
    path: string;
    component: () => Promise<any>;
    meta: {
        authGuard?: boolean;
        roles?: UsuarioNivel[];
        breadcrumb: ShortRoute[];
        icon: string;
        label: string;
    };
    name: string;
    children?: Route[];
}
