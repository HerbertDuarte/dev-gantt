<template>
    <q-form @submit.prevent.stop="() => submit()" greedy>
        <div>

            <q-input dense outlined v-model="form.nome" lazy-rules label="Nome" hint="Informe o nome completo sem
            abreviações" clearable clear-icon="close" :rules="nameRules" />


            <q-input dense outlined v-model="form.email" lazy-rules label="Email" hint="Informe o email" clearable
                clear-icon="close" :rules="emailRules" />


            <q-select dense outlined v-model="form.situacao" :options="situacaoOpt" lazy-rules label="Situação"
                hint="Informe a situação" clear-icon="close" :rules="campoVazioRules" />

            <q-input dense outlined v-model="form.login" lazy-rules label="Login" hint="Informe o nome para login"
                clearable clear-icon="close" :rules="loginRules" />

            <q-checkbox class="py-2" v-model="mudarSenha" label="mudar senha" />
            <div v-if="mudarSenha">
                <q-input dense outlined v-model="form.senhaAntiga" lazy-rules label="Senha antiga"
                    hint="Informe sua senha antiga" type="password" clear-icon="close" :rules="senhaRules" />
                <q-input type="password" dense outlined v-model="form.senhaNova" lazy-rules label="Senha nova"
                    hint="Informe uma senha" clear-icon="close" :rules="senhaRules" />
                <q-input dense outlined v-model="senhaNovaConfirmacao" lazy-rules label="Confirmação da senha"
                    hint="Informe novamente a senha" type="password" clear-icon="close" :rules="confirmarSenhaRules" />

            </div>
        </div>

        <div class="flex items-center justify-end gap-2 pt-6">
            <q-btn label="Salvar" type="submit" class="cti-button-dark" />
            <q-btn @click="cancelFunc && cancelFunc()" v-close-popup label="Cancelar" class="cti-button" />
        </div>
    </q-form>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useUsuarioStore } from '../../../../../infrastructure/store/usuario.store';
import { storeToRefs } from 'pinia';
import {
    Usuario,
} from '../../../../../domain/entities/usuario';

import { notifyError } from '../../../../../lib/ui/notify/notify-error';
import { UpdateUsuarioDto } from '../../dto/update-usuario-dto';
import { SituacaoOption, situacaoOptions } from '../../utils/situacao-options';
const props = defineProps<{
    closeDialog?: () => void;
    cancelFunc?: () => void;
}>();

const mudarSenha = ref(false);
const usuarioStore = useUsuarioStore();
const usuario = storeToRefs(usuarioStore).usuario;

const formInitialState: UpdateUsuarioDto = {
    nome: '',
    email: '',
    situacao: situacaoOptions[0],
    login: '',
    senhaAntiga: '',
    senhaNova: ''
};

const form = ref<UpdateUsuarioDto>(formInitialState);
const senhaNovaConfirmacao = ref('');
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
    form.value.situacao = situacaoAdapter(data.situacao);
    form.value.login = data.login;
}

async function submit() {
    if (!mudarSenha.value) {
        delete form.value.senhaAntiga
        delete form.value.senhaNova
    }

    usuarioStore
        .atualizaUsuario(form.value)
        .then(() => {
            props.closeDialog ? props.closeDialog() : null;
        })
        .catch((error) => {
            notifyError({ error });
        });

}

function situacaoAdapter(value: number): SituacaoOption {
    return situacaoOpt.value.find((item) => item.value === value) as SituacaoOption;
}

onMounted(async () => {
    usuarioStore.usuario = usuario.value as Usuario;
    preencheCampos(usuario.value as Usuario);
});
</script>
