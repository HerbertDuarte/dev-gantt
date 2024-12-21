<script setup lang="ts">
import { ref } from 'vue';
import { fakeMarcos } from '../../../../../infrastructure/store/fakedb';
import DatePickerDialog from './DatePickerDialog.vue';
import { emptyFieldValidator } from '../../../../../lib/ui/ui-validators/empty-field-validator';
import { normalizeValidator } from '../../../../../lib/ui/ui-validators/normalize-validator';
import { CreateTarefaDto } from './types/create-tarefa.dto';
import { TarefaDates } from './types/tarefa-dates.dto';
import { Tarefa } from '../../../../../domain/entities/tarefa';
import { useGanttStore } from '../../../../../infrastructure/store/gantt.store';
import { Usuario } from '../../../../../domain/entities/usuario';
const { criaTarefa, responsaveis } = useGanttStore()
const marcos = fakeMarcos
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

    const tarefa = new Tarefa({
        nome: form.value.nome,
        marcoId: form.value.marcoId,
        descricao: form.value.descricao,
        dataInicio: new Date(dates.value.from),
        dataFim: new Date(dates.value.to),
        usuariosTarefas:form.value.responsaveis
    })

    await criaTarefa(tarefa);

}

</script>

<template>
    <DatePickerDialog @define-dates="setDates" :dates="dates" v-model="datePickerDialogModel" />

    <q-form @submit.prevent.stop="" greedy>
        <div>
            <q-input outlined lazy-rules dense v-model="form.nome" label="Nome"
                :rules="[emptyFieldValidator, normalizeValidator]">
            </q-input>

            <div class="flex items-center justify-start gap-2">
                <q-select option-value="id" option-label="nome" hide-dropdown-icon outlined class="flex-1" dense
                    v-model="form.marcoId" :options="marcos" lazy-rules label="Marco" clear-icon="close"
                    :rules="[emptyFieldValidator]" />

                <q-select option-value="id" option-label="nome" hide-dropdown-icon outlined class="flex-1" dense
                    v-model="form.responsaveis" multiple :options="responsaveis" lazy-rules label="Responsaveis"
                    clear-icon="close" :rules="[emptyFieldValidator]" />
            </div>

            <div class="flex items-center justify-start gap-2">
                <q-input disable outlined class="flex-1" dense v-model="dates.from" lazy-rules label="Data inicial" />

                <q-input disable outlined class="flex-1" dense v-model="dates.to" lazy-rules label="Data final" />

                <q-btn icon="calendar_month" @click="openDatePickerComponent" class="ganttly-button-dark" dense round />
            </div>


            <div class="pt-4">
                <q-input type="textarea" outlined dense v-model="form.descricao" lazy-rules label="Descrição" />
            </div>

        </div>

        <div class="flex items-center justify-end gap-2 pt-6">
            <q-btn class="ganttly-button-dark" @click="submit()" size="md" label="Salvar" type="submit" />
            <q-btn class="ganttly-button" v-close-popup label="Cancelar" />
        </div>
    </q-form>

</template>