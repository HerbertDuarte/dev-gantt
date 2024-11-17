<script setup lang="ts">
import { ref } from 'vue';
import { fakeMarcos, responsaveis } from '../../../../../infrastructure/store/fakedb';
import DatePickerDialog from './DatePickerDialog.vue';
const dialogRef = ref<any>(null);
type Dates = { from: string, to: string }

type CreateTarefaDto = {
    nome: string;
    marcoId: number | null;
    responsavelId: number | null;
}

const formInitialState = {
    nome: '',
    marcoId: null,
    responsavelId: null
}
const form = ref<CreateTarefaDto>(formInitialState);

function validaNome(val: string) {
    const regex = /[!@#$%*()_+=-?°``''~©,.;<>:]|[0-9]/g;

    return !regex.test(val);
}

const nomeValidator = [
    (val: string) => !!val || '*Campo obrigatório',
    (val: string) =>
        validaNome(val) ||
        "*Proibido o uso dos seguintes caracteres [!@#$%*()_+=-?°``''~©,.;<>:], valores numéricos ou espaços",
];

const campoValidator = [(val: string) => !!val || '*Campo obrigatório'];
const marcos = fakeMarcos
const reponsaveis = responsaveis
const dates = ref({
    from: "",
    to: ""
})

function setDates(value: Dates) {
    console.log("setou")
    dates.value.from = value.from;
    dates.value.to = value.to;
}

const datePickerDialogModel = ref(false)
const openDatePickerComponent = () => datePickerDialogModel.value = true
</script>

<template>
    <q-dialog persistent ref="dialogRef">
        <DatePickerDialog @define-dates="setDates" :dates="dates" v-model="datePickerDialogModel" />
        <q-card class="w-screen">
            <div class="flex justify-between items-center bg-gray-100 px-2 py-0.5">
                <p class="font-medium">Criação de tarefa</p>
                <q-btn flat dense round icon="close" class="text-red-500" v-close-popup />
            </div>
            <div class="p-4">
                <q-form @submit.prevent.stop="" greedy>
                    <div class="space-y-2">
                        <q-input borderless class="cti-input" dense v-model="form.nome" lazy-rules label="Nome"
                            :rules="nomeValidator" />

                        <div class="flex items-center justify-start gap-2">
                            <q-select option-value="id" option-label="nome" hide-dropdown-icon borderless
                                class="cti-input flex-1" dense v-model="form.marcoId" :options="marcos" lazy-rules
                                label="Marco" clear-icon="close" :rules="campoValidator" />

                            <q-select option-value="id" option-label="nome" hide-dropdown-icon borderless
                                class="cti-input flex-1" dense v-model="form.responsavelId" :options="reponsaveis"
                                lazy-rules label="Responsavel" clear-icon="close" :rules="campoValidator" />
                        </div>

                        <div class="flex items-center justify-start gap-2">
                            <q-input disable borderless class="cti-input flex-1" dense v-model="dates.from" lazy-rules
                                label="Data inicial" />

                            <q-input disable borderless class="cti-input flex-1" dense v-model="dates.to" lazy-rules
                                label="Data final" />

                            <q-btn icon="calendar_month" @click="openDatePickerComponent" class="cti-button-dark" dense
                                round />
                        </div>
                    </div>

                    <div class="flex items-center justify-end gap-2 pt-6">
                        <q-btn class="cti-button-dark" size="md" label="Salvar" type="submit" />
                        <q-btn @click="" v-close-popup label="Cancelar" color="grey-2" text-color="grey-10" />
                    </div>
                </q-form>
            </div>
        </q-card>
    </q-dialog>
</template>