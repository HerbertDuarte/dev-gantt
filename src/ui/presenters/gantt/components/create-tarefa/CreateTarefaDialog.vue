<script setup lang="ts">
import { ref } from 'vue';
import { fakeMarcos, responsaveis } from '../../../../../infrastructure/store/fakedb';
import DatePickerDialog from './DatePickerDialog.vue';
import { emptyFieldValidator } from '../../../../../lib/ui/ui-validators/empty-field-validator';
import { normalizeValidator } from '../../../../../lib/ui/ui-validators/normalize-validator';
const dialogRef = ref<any>(null);
type Dates = { from: string, to: string }

type CreateTarefaDto = {
    nome: string;
    marcoId: any;
    responsavelId: any;
    descricao?: string;
}

const formInitialState = {
    nome: '',
    marcoId: null,
    responsavelId: null,
    descricao: ''
}
const form = ref<CreateTarefaDto>(formInitialState);

const marcos = fakeMarcos
const reponsaveis = responsaveis

const dates = ref({
    from: "",
    to: ""
})

function setDates(value: Dates) {
    dates.value.from = value.from;
    dates.value.to = value.to;
}

const datePickerDialogModel = ref(false)
const openDatePickerComponent = () => datePickerDialogModel.value = true

function submit() {
    console.log(buildDTO())
}

function buildDTO() {
    return {
        ...form.value,
        responsavelId: form.value.responsavelId?.id,
        marcoId: form.value.marcoId?.id,
        dataInicial: dates.value.from,
        dataFinal: dates.value.to
    }
}
</script>

<template>
    <q-dialog persistent ref="dialogRef" class="rounded-3xl">
        <DatePickerDialog @define-dates="setDates" :dates="dates" v-model="datePickerDialogModel" />
        <q-card style="width: 90vw; max-width: 600px;">
            <div class="flex justify-between items-center bg-slate-100 p-2">
                <p class="font-medium text-base uppercase">Criação de tarefa</p>
                <q-btn flat dense round icon="close" class="text-slate-700" v-close-popup />
            </div>
            <div class="p-4">
                <q-form @submit.prevent.stop="" greedy>
                    <div>
                        <q-input borderless class="cti-input" lazy-rules dense v-model="form.nome" label="Nome"
                            :rules="[emptyFieldValidator, normalizeValidator]">
                        </q-input>

                        <div class="flex items-center justify-start gap-2">
                            <q-select option-value="id" option-label="nome" hide-dropdown-icon borderless
                                class="cti-input flex-1" dense v-model="form.marcoId" :options="marcos" lazy-rules
                                label="Marco" clear-icon="close" :rules="[emptyFieldValidator]" />

                            <q-select option-value="id" option-label="nome" hide-dropdown-icon borderless
                                class="cti-input flex-1" dense v-model="form.responsavelId" :options="reponsaveis"
                                lazy-rules label="Responsavel" clear-icon="close" :rules="[emptyFieldValidator]" />
                        </div>

                        <div class="flex items-center justify-start gap-2">
                            <q-input disable borderless class="cti-input flex-1" dense v-model="dates.from" lazy-rules
                                label="Data inicial" />

                            <q-input disable borderless class="cti-input flex-1" dense v-model="dates.to" lazy-rules
                                label="Data final" />

                            <q-btn icon="calendar_month" @click="openDatePickerComponent" class="cti-button-dark" dense
                                round />
                        </div>


                        <div class="pt-4">
                            <q-input type="textarea" borderless class="cti-input" dense v-model="form.descricao"
                                lazy-rules label="Descrição" />
                        </div>

                    </div>

                    <div class="flex items-center justify-end gap-2 pt-6">
                        <q-btn class="cti-button-dark" @click="submit()" size="md" label="Salvar" type="submit" />
                        <q-btn class="cti-button" v-close-popup label="Cancelar" />
                    </div>
                </q-form>
            </div>
        </q-card>
    </q-dialog>
</template>