<template>
    <q-form @submit.prevent.stop="() => submit()" greedy>
        <div class="flex gap-4">
            <q-input borderless class="cti-input basis-[700px] flex-1" dense v-model="form.nome" lazy-rules
                label="Nome completo" clearable clear-icon="close" :rules="nameRules" />

            <q-input borderless class="cti-input basis-[500px] flex-1" dense v-model="form.email" lazy-rules
                label="Email" clearable clear-icon="close" :rules="emailRules" />

            <q-select borderless class="cti-input basis-[200px] flex-1" dense v-model="form.situacao"
                :options="situacaoOpt" lazy-rules label="Situação de atividade" clear-icon="close"
                :rules="campoVazioRules" />

            <q-input borderless class="cti-input basis-[400px] flex-1" dense v-model="form.login" lazy-rules
                label="Nome de login" clearable clear-icon="close" :rules="loginRules" />

            <q-input borderless class="cti-input basis-[400px] flex-1" type="password" dense v-model="form.senha"
                lazy-rules label="Senha de acesso" clear-icon="close" :rules="senhaRules" />

            <q-input borderless class="cti-input basis-[400px] flex-1" dense v-model="confirmacao_senha" lazy-rules
                label="Confirmação da senha" type="password" clear-icon="close" :rules="confirmarSenhaRules" />

        </div>

        <div class="flex items-center justify-end gap-2 pt-6">
            <q-btn size="md" label="Salvar" type="submit" color="primary" />
            <q-btn @click="cancelFunc && cancelFunc()" v-close-popup label="Cancelar" color="grey-2"
                text-color="grey-10" />
        </div>
    </q-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
    Usuario
} from '../../../../../domain/entities/usuario';
import { useUsuarioStore } from '../../../../../infrastructure/store/usuario.store';

import { criarUsuario } from '../../../../../infrastructure/actions/usuario.actions';
import { notifyError } from '../../../../../lib/ui/notify/notify-error';
import { FormCreateUsuarioDto } from '../../dto/create-usuario-dto';
import { situacaoOptions } from '../../utils/situacao-options';
const props = defineProps<{
    update?: boolean;
    closeDialog?: () => void;
    prevUsuario?: Usuario | null;
    cancelFunc?: () => void;
}>();

const usuarioStore = useUsuarioStore();

const formInitialState: FormCreateUsuarioDto = {
    nome: '',
    email: '',
    situacao: situacaoOptions[0],
    login: '',
    senha: '',
};

const form = ref<FormCreateUsuarioDto>(formInitialState);
const confirmacao_senha = ref('');
const situacaoOpt = ref(situacaoOptions)

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
    return form.value.senha.length >= 6;
}

function validaConfirmacaoSenha() {
    if (!!props.update && form.value.senha.length == 0) return true;

    const valoresIguais = form.value.senha === confirmacao_senha.value;

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

async function submit() {

    callCreate();
}

function callCreate() {
    criarUsuario(form.value)
        .then(() => {
            props.closeDialog ? props.closeDialog() : null;
        })
        .catch((error) => {
            notifyError({ error });
        });
}
</script>
