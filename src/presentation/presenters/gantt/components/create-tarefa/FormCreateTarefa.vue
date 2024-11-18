<script setup lang="ts">
import { ref } from 'vue';
import { fakeMarcos, responsaveis } from '../../../../../infrastructure/store/fakedb';
import DatePickerDialog from './DatePickerDialog.vue';
import { emptyFieldValidator } from '../../../../../lib/ui/ui-validators/empty-field-validator';
import { normalizeValidator } from '../../../../../lib/ui/ui-validators/normalize-validator';
import { CreateTarefaDto } from './types/create-tarefa.dto';
import { TarefaDates } from './types/tarefa-dates.dto';
import { Tarefa } from '../../../../../domain/entities/tarefa';
import { useGanttStore } from '../../../../../infrastructure/store/gantt.store';
const { criaTarefa } = useGanttStore()
const marcos = fakeMarcos
const reponsaveis = responsaveis
const form = ref<CreateTarefaDto>({
    nome: '',
    marcoId: null,
    responsaveis: [],
    descricao: ''
});

const dates = ref<TarefaDates>({
    from: "",
    to: ""
})

function setDates(value: TarefaDates) {
    dates.value.from = value.from;
    dates.value.to = value.to;
}

const datePickerDialogModel = ref(false)
const openDatePickerComponent = () => datePickerDialogModel.value = true

async function submit() {
    try {
        const tarefa = new Tarefa({
            nome: form.value.nome,
            marcoId: form.value.marcoId,
            descricao: form.value.descricao,
            dataInicio: new Date(dates.value.from),
            dataFim: new Date(dates.value.to),
            responsaveis: form.value.responsaveis
        })

        await criaTarefa(tarefa);
    } catch (error) {
        console.log(error)
    }
}

</script>

<template>
    <DatePickerDialog @define-dates="setDates" :dates="dates" v-model="datePickerDialogModel" />

    <q-form @submit.prevent.stop="" greedy>
        <div>
            <q-input borderless class="cti-input" lazy-rules dense v-model="form.nome" label="Nome"
                :rules="[emptyFieldValidator, normalizeValidator]">
            </q-input>

            <div class="flex items-center justify-start gap-2">
                <q-select option-value="id" option-label="nome" hide-dropdown-icon borderless class="cti-input flex-1"
                    dense v-model="form.marcoId" :options="marcos" lazy-rules label="Marco" clear-icon="close"
                    :rules="[emptyFieldValidator]" />

                <q-select option-value="id" option-label="nome" hide-dropdown-icon borderless class="cti-input flex-1"
                    dense v-model="form.responsaveis" multiple :options="reponsaveis" lazy-rules label="Responsaveis"
                    clear-icon="close" :rules="[emptyFieldValidator]" />
            </div>

            <div class="flex items-center justify-start gap-2">
                <q-input disable borderless class="cti-input flex-1" dense v-model="dates.from" lazy-rules
                    label="Data inicial" />

                <q-input disable borderless class="cti-input flex-1" dense v-model="dates.to" lazy-rules
                    label="Data final" />

                <q-btn icon="calendar_month" @click="openDatePickerComponent" class="cti-button-dark" dense round />
            </div>


            <div class="pt-4">
                <q-input type="textarea" borderless class="cti-input" dense v-model="form.descricao" lazy-rules
                    label="Descrição" />
            </div>

        </div>

        <div class="flex items-center justify-end gap-2 pt-6">
            <q-btn class="cti-button-dark" @click="submit()" size="md" label="Salvar" type="submit" />
            <q-btn class="cti-button" v-close-popup label="Cancelar" />
        </div>
    </q-form>

</template>