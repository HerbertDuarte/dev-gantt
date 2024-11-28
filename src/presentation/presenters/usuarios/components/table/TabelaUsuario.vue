<template>
    <CtiTable :dados="usuarios" :colunas="colunas" :acoes="acoes">
        <template v-slot:header>
            <BuscaUsuario class="flex-1" />
        </template>

        <template v-slot:bottom>
            <q-btn icon="add" class="cti-button-dark" label="Novo Usuário"
                @click="() => router.push({ name: 'usuario-cadastro' })" />
            <Pagination :page-props="pageProps" :find-action="getUsuarios" :total-paginas="usuarios.maxPag" />
        </template>
    </CtiTable>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { Dialog, QTableColumn } from 'quasar';
import { useRouter } from 'vue-router';
import { deletaUsuario, getUsuario, getUsuarios } from '../../../../../infrastructure/actions/usuario.actions';
import { useUsuarioStore } from '../../../../../infrastructure/store/usuario.store';
import { CreateAlert } from '../../../../../lib/ui/alert/useAlert';
import CtiTable, { Acao } from '../../../../../lib/ui/table/CtiTable.vue';
import Pagination from '../../../../../lib/ui/table/Pagination.vue';
import CreateUsuario from '../CreateUsuario.vue';
import UpdateUsuario from '../UpdateUsuario.vue';
import BuscaUsuario from './BuscaUsuario.vue';

const router = useRouter()
const usuarioStore = useUsuarioStore();
const pageProps = usuarioStore.pageProps();
const { usuarios } = storeToRefs(usuarioStore);

const colunas: QTableColumn[] = [
    { name: 'nome', label: 'Nome', field: 'nome', align: 'left' },
    { name: 'login', label: 'Login', field: 'login', align: 'left' },
    { name: 'email', label: 'E-mail', field: 'email', align: 'left' },
];

const acoes: Acao[] = [
    {
        label: 'Editar',
        icon: 'edit',
        color: 'primary',
        action: abrirModalEdicao,
    },
    {
        label: 'Excluir',
        icon: 'delete',
        color: 'negative',
        action: abrirModalDelecao,
    },

];

function abrirModalCriacao() {
    Dialog.create({
        component: CreateUsuario,
    });
}

async function abrirModalEdicao(row: { id: string }) {
    await getUsuario(row.id);
    Dialog.create({
        component: UpdateUsuario,
    });
}

function abrirModalDelecao(row: { id: string; nome: string }) {
    CreateAlert({
        mensagem: `Tem certeza que deseja deletar ${row.nome}?`,
        buttonTitle: 'Deletar',
        action: () => deletaUsuario(row.id),
    });
}
</script>
