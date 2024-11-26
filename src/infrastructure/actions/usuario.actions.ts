import { storeToRefs } from 'pinia';
import { Notify } from 'quasar';
import { UpdateUsuarioDto } from '../../domain/dto/update-usuario.dto';
import { Usuario } from '../../domain/entities/usuario';
import { PaginateUtil } from '../../lib/paginacao/paginate-util';
import { Queries } from '../../lib/paginacao/queries';
import { FormCreateUsuarioDto } from '../../presentation/presenters/usuarios/dto/create-usuario-dto';
import { FormUpdateUsuarioDto } from '../../presentation/presenters/usuarios/dto/update-usuario-dto';
import { api } from '../boot/axios';
import { useUsuarioStore } from '../store/usuario.store';

const usuarioStore = useUsuarioStore();
const { pageProps } = usuarioStore;
const { usuarios, usuario, busca } = storeToRefs(usuarioStore);

export async function getUsuarios() {
    const queries: Queries = {
        busca: busca.value,
    };
    const { data, maxPag } = await PaginateUtil.paginate<Usuario>({
        pageProps,
        path: 'usuarios',
        queries,
    });
    usuarios.value.data = data;
    usuarios.value.maxPag = maxPag;
}

export async function getUsuario(id: string) {
    const { data } = await api.get<Usuario>('/usuarios/' + id);
    usuario.value = data;
}

export async function deletaUsuario(id: string) {
    await api.delete('/usuarios/' + id);
    return notifyAndRefresh('Usuário deletado com sucesso');
}

export async function criarUsuario(form: FormCreateUsuarioDto) {
    const body: Usuario = { ...form, situacao: form.situacao.value };
    await api.post('/usuarios', body);
    return notifyAndRefresh('Usuário salvo com sucesso');
}

export async function atualizaUsuario(form: FormUpdateUsuarioDto) {
    const body: UpdateUsuarioDto = {
        ...form,
        situacao: form.situacao.value,
    };
    await api.put('/usuarios/' + (usuario.value as Usuario).id, body);
    return notifyAndRefresh('Usuário atualizado com sucesso');
}

export async function atualizaPerfil(form: FormUpdateUsuarioDto) {
    const body: UpdateUsuarioDto = {
        ...form,
        situacao: form.situacao.value,
    };
    await api.put('/usuarios/perfil/', body);
    return notifyAndRefresh('Perfil atualizado com sucesso');
}

async function notifyAndRefresh(message: string) {
    await getUsuarios();
    Notify.create({
        message,
        type: 'positive',
    });
}
