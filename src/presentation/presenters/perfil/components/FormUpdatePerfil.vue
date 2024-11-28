<template>
    <q-form @submit.prevent.stop="() => submit()" greedy>
        <div class="space-y-2">
            <q-input outlined dense v-model="form.nome" lazy-rules label="Nome" clearable clear-icon="close"
                :rules="nameRules" />


            <q-input outlined dense v-model="form.email" lazy-rules label="Email" clearable clear-icon="close"
                :rules="emailRules" />


            <q-select hide-dropdown-icon outlined disable dense v-model="form.situacao" :options="situacaoOpt"
                lazy-rules label="Situação" clear-icon="close" :rules="campoVazioRules" />

            <q-input outlined dense v-model="form.login" lazy-rules label="Login" clearable clear-icon="close"
                :rules="loginRules" />

            <q-checkbox class="py-2" v-model="mudarSenha" label="mudar senha" />

            <div class="space-y-2" v-if="mudarSenha">
                <q-input outlined dense v-model="form.senhaAntiga" lazy-rules label="Senha antiga" type="password"
                    clear-icon="close" :rules="senhaRules" />
                <q-input outlined type="password" dense v-model="form.senhaNova" lazy-rules label="Senha nova"
                    clear-icon="close" :rules="senhaRules" />
                <q-input outlined dense v-model="senhaNovaConfirmacao" lazy-rules label="Confirmação da senha"
                    type="password" clear-icon="close" :rules="confirmarSenhaRules" />

            </div>
        </div>

        <div class="flex items-center justify-end gap-2 pt-6">
            <q-btn size="md" label="Salvar" type="submit" class="cti-button-dark" />
            <q-btn @click="cancelFunc && cancelFunc()" v-close-popup label="Cancelar" class="cti-button" />
        </div>
    </q-form>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useUsuarioStore } from '../../../../infrastructure/store/usuario.store';

import { Usuario } from '../../../../domain/entities/usuario';
import { UsuarioSituacao } from '../../../../domain/enum/usuario-situacao.enum';
import { atualizaPerfil } from '../../../../infrastructure/actions/usuario.actions';
import { useAuthStore } from '../../../../infrastructure/store/auth-store';
import { notifyError } from '../../../../lib/ui/notify/notify-error';
import { FormUpdateUsuarioDto } from '../../usuarios/dto/update-usuario-dto';
import { situacaoOptions, SituacaoOptionUtil } from '../../usuarios/utils/situacao-options';

const auth = useAuthStore()
const props = defineProps<{
    closeDialog?: () => void;
    prevUsuario?: Usuario | null;
    cancelFunc?: () => void;
}>();

const mudarSenha = ref(false);
const usuarioStore = useUsuarioStore();
const usuario = ref(props.prevUsuario);
const formInitialState: FormUpdateUsuarioDto = {
    nome: '',
    email: '',
    situacao: SituacaoOptionUtil.toOption(UsuarioSituacao.Ativo),
    login: '',
    senhaAntiga: '',
    senhaNova: ''
};

const situacaoOpt = ref(situacaoOptions)
const form = ref<FormUpdateUsuarioDto>(formInitialState);
const senhaNovaConfirmacao = ref('');


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
    form.value.situacao = SituacaoOptionUtil.toOption(data.situacao);
    form.value.login = data.login;
}

async function submit() {
    const updateUsuarioDto = form.value
    if (!mudarSenha.value) {
        delete updateUsuarioDto.senhaAntiga
        delete updateUsuarioDto.senhaNova
    }

    atualizaPerfil(updateUsuarioDto)
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
