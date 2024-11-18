<template>
    <q-form @submit.prevent.stop="() => submit()" greedy>
        <div class="space-y-2">
            <q-input borderless class="cti-input" dense v-model="form.nome" lazy-rules label="Nome" clearable
                clear-icon="close" :rules="nameRules" />


            <q-input borderless class="cti-input" dense v-model="form.email" lazy-rules label="Email" clearable
                clear-icon="close" :rules="emailRules" />


            <q-select hide-dropdown-icon borderless class="cti-input" disable dense v-model="form.nivel"
                :options="nivelAcesso" lazy-rules label="Nível" clear-icon="close" :rules="campoVazioRules" />


            <q-select hide-dropdown-icon borderless class="cti-input" disable dense v-model="form.situacao"
                :options="situacao" lazy-rules label="Situação" clear-icon="close" :rules="campoVazioRules" />

            <q-input borderless class="cti-input" dense v-model="form.login" lazy-rules label="Login" clearable
                clear-icon="close" :rules="loginRules" />

            <q-checkbox class="py-2" v-model="mudarSenha" label="mudar senha" />

            <div class="space-y-2" v-if="mudarSenha">
                <q-input borderless class="cti-input" dense v-model="form.senhaAntiga" lazy-rules label="Senha antiga"
                    type="password" clear-icon="close" :rules="senhaRules" />
                <q-input borderless class="cti-input" type="password" dense v-model="form.senhaNova" lazy-rules
                    label="Senha nova" clear-icon="close" :rules="senhaRules" />
                <q-input borderless class="cti-input" dense v-model="senhaNovaConfirmacao" lazy-rules
                    label="Confirmação da senha" type="password" clear-icon="close" :rules="confirmarSenhaRules" />

            </div>
        </div>

        <div class="flex items-center justify-end gap-2 pt-6">
            <q-btn size="md" label="Salvar" type="submit" color="primary" />
            <q-btn @click="cancelFunc && cancelFunc()" v-close-popup label="Cancelar" color="grey-2"
                text-color="grey-10" />
        </div>
    </q-form>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useUsuarioStore } from '../../../../infrastructure/store/usuario.store';

import { notifyError } from '../../../../lib/ui/notify/notify-error';
import { useAuthStore } from '../../../../infrastructure/store/auth-store';
import { UpdateUsuarioDto } from '../../usuarios/dto/update-usuario-dto';
import { Usuario } from '../../../../domain/entities/usuario';
import { UsuarioNivel } from '../../../../domain/enum/usuario-nivel.enum';
import { UsuarioSituacao } from '../../../../domain/enum/usuario-situacao.enum';

const auth = useAuthStore()
const props = defineProps<{
    closeDialog?: () => void;
    prevUsuario?: Usuario | null;
    cancelFunc?: () => void;
}>();

const mudarSenha = ref(false);
const usuarioStore = useUsuarioStore();
const usuario = ref(props.prevUsuario);
const formInitialState: UpdateUsuarioDto = {
    nome: '',
    email: '',
    nivel: UsuarioNivel.Usuario,
    situacao: UsuarioSituacao.Ativo,
    login: '',
    senhaAntiga: '',
    senhaNova: ''
};

const form = ref<UpdateUsuarioDto>(formInitialState);
const senhaNovaConfirmacao = ref('');
const nivelAcesso = ref(['Usuário', 'Administrador']);
const situacao = ref(['Ativo', 'Inativo']);

function validaNome(val: string) {
    const regex = /[!@#$%*()_+=-?°``''~©,.;<>:]|[0-9]/g;

    return !regex.test(val);
}

function validaEmail(val: string) {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(val);
}

function validaLogin(val: string) {
    const regex = /[^a-zA-Zs]/g;

    return !regex.test(val);
}

function validaSenha() {
    if (!mudarSenha) return true
    return form.value?.senhaNova && form.value?.senhaNova.length >= 6;
}

function validaConfirmacaoSenha() {
    if (!mudarSenha) return true

    const valoresIguais = form.value.senhaNova === senhaNovaConfirmacao.value;

    if (valoresIguais) return true;
}

const campoVazioRules = [(val: string) => !!val || '*Campo obrigatório'];

const nameRules = [
    (val: string) => !!val || '*Campo obrigatório',
    (val: string) =>
        validaNome(val) ||
        "*Proibido o uso dos seguintes caracteres [!@#$%*()_+=-?°``''~©,.;<>:], valores numéricos ou espaços",
];

const emailRules = [
    (val: string) => !!val || '*Campo obrigatório',
    (val: string) => validaEmail(val) || '*Formato de email inválido',
];

const loginRules = [
    (val: string) => !!val || '*Campo obrigatório',
    (val: string) =>
        validaLogin(val) ||
        "*Proibido o uso dos seguintes caracteres [!@#$%*()_+=-?°``''~©,.;<>:], valores numéricos ou espaços",
];

const senhaRules = [
    () => validaSenha() || '*Campo obrigatório. Valor mínimo de 6 caracteres',
];

const confirmarSenhaRules = [
    () =>
        validaConfirmacaoSenha() ||
        '*A senha deve ser igual a confirmação da senha',
];

function preencheCampos(data: Usuario) {
    form.value.nome = data.nome;
    form.value.email = data.email;
    form.value.nivel = data.nivel;
    form.value.situacao = data.situacao;
    form.value.login = data.login;
}

async function submit() {
    const updateUsuarioDto = form.value
    if (!mudarSenha.value) {
        delete updateUsuarioDto.senhaAntiga
        delete updateUsuarioDto.senhaNova
    }

    usuarioStore
        .atualizaPerfil(updateUsuarioDto)
        .then(() => {
            props.closeDialog ? props.closeDialog() : null;
        })
        .catch((error) => {
            notifyError({ error });
        });

    if (props.prevUsuario?.id) {
        await auth.getUser(props.prevUsuario.id);
    }

    form.value.senhaAntiga = ""
    form.value.senhaNova = ""
    senhaNovaConfirmacao.value = ""
    mudarSenha.value = false
}



onMounted(async () => {
    usuarioStore.usuario = usuario.value as Usuario;
    preencheCampos(usuario.value as Usuario);
});
</script>
