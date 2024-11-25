type ShortRoute = {
    path: string;
    title: string;
};
export interface Route {
    path: string;
    component: () => Promise<any>;
    meta: {
        authGuard?: boolean;
        breadcrumb: ShortRoute[];
        icon: string;
        label: string;
    };
    name: string;
    children?: Route[];
}
