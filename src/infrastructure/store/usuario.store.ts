import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Usuario } from '../../domain/entities/usuario';
import { usePageProps } from '../../lib/paginacao/page-props';
import { PaginateResponse } from '../../lib/paginacao/paginate-response';

type Usuarios = PaginateResponse<Usuario>;

export const useUsuarioStore = defineStore('usuario', () => {
    const usuarios = ref<Usuarios>({ data: [], maxPag: 0 });
    const usuario = ref<Usuario | null>(null);
    const pageProps = usePageProps({ itensPorPagina: 5 });
    const busca = ref('');

    return {
        usuarios,
        usuario,
        busca,
        pageProps,
    };
});
