<template>
    <div v-if="tarefas && tarefas.length > 0" class="tables-container">
        <div ref="tarefasTableRef" @scroll="" class="tarefas-table-container">
            <table class="tarefa-table">
                <thead>
                    <tr>
                        <th colspan="6" class="tarefa-table-title">
                            {{ projeto.nome }}
                        </th>
                    </tr>
                    <tr class="tarefa-tr">
                        <th>Tarefa</th>
                        <th>Responsável</th>
                        <th>Data início</th>
                        <th>Data final</th>
                        <th>Duração</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr :class="`tarefa-tr hover`" :key="tarefa.id" v-for="tarefa in tarefas">
                        <td @click="
">
                            <p :style="{ paddingLeft: `${tarefa.nivel * 16}px` }" class="tarefa-td-nome">
                                <q-tooltip anchor="center middle" self="center middle" class="text-white" :delay="1000">
                                    {{ tarefa.num }} - {{ tarefa.nome }}</q-tooltip>
                                {{ tarefa.num }} - {{ tarefa.nome }}
                            </p>
                        </td>
                        <td @click="
">
                            <p class="tarefa-td-responsavel">
                                <span v-if="
                                    tarefa.status === 'marco' ||
                                    (tarefa.tarefas_filhas && tarefa.tarefas_filhas.length > 0)
                                ">
                                    --
                                </span>
                                <span v-else>
                                    {{ tarefa.responsavel?.nome.split(' ')[0] }}
                                </span>
                            </p>
                        </td>
                        <td>
                            {{ format(tarefa.data_inicio, "P") }}
                        </td>
                        <td>
                            {{ format(tarefa.data_fim, "P") }}
                        </td>
                        <td>
                            {{ `${differenceInDays(tarefa.data_fim, tarefa.data_fim)}
                            ${differenceInDays(tarefa.data_fim, tarefa.data_fim) > 1 ? 'dias' : 'dia'}` }}
                        </td>
                        <td>
                            <div v-if="
                                (tarefa.tarefas_filhas && tarefa.tarefas_filhas.length > 0)

                            " class="status-td-content">
                                <p class="q-pa-none tarefa-status-label">{{ tarefa.status }}</p>
                            </div>
                            <div v-else class="status-td-content">
                                <SelectStatus @update-tarefa="" :tarefa="tarefa" />
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div ref="ganttTableRef" @scroll="" class="gantt-table-container">
            <table class="gantt-table">
                <thead>
                    <tr>
                        <th class="week-title" v-if="diasDaPrimeiraSemana > 0" :colspan="diasDaPrimeiraSemana">
                            início
                        </th>
                        <th :key="week" v-for="week in qtdSemanasInteiras" colspan="7" class="week-title">
                            semana {{ week + 1 }}
                        </th>
                        <th class="week-title" v-if="diasDaUltimaSemana > 0" :colspan="diasDaUltimaSemana">
                            fim
                        </th>
                    </tr>
                    <tr>
                        <th :key="day" v-for="day in duracaoProjetoExibicao">
                            {{ day.toString().padStart(2, '0') }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr :key="tarefaIndex" v-for="(tarefa, tarefaIndex) in tarefas" :class="`size-4`">
                        <td v-for="diaDeProjeto in getListaDias(projeto.data_inicio, tarefa.data_fim)">
                            <div v-if="diaDeProjeto < tarefa.data_inicio" class="empty-space"></div>
                            <div v-else :class="`size-4 bg-${colorClass[tarefa.status as keyof typeof colorClass]}`">{{
                                }}</div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div v-else>
        <p v-if="projeto && marcos.length === 0">
            <b>Nenhuma</b> tarefa foi registrada no projeto
            <b>{{ projeto.nome }}</b>.
        </p>
        <p v-if="projeto && marcos.length > 0">
            {{ marcos.length > 1 ? 'Existem' : 'Existe' }}
            <b>
                <q-tooltip class="bg-blue-9 text-white text-lg" :delay="1000">
                    <p class="q-ma-none" :key="index" v-for="(marco, index) in marcos">
                        {{ marco.nome }}
                    </p>
                </q-tooltip>
                {{ marcos.length }} {{ marcos.length > 1 ? 'marcos' : 'marco' }}
            </b>
            {{ marcos.length > 1 ? 'registrados' : 'registrado' }} no projeto,
            porém <b>nenhuma</b> tarefa foi registrada no projeto
            <b>{{ projeto.nome }}</b>.
        </p>
    </div>

</template>
<script setup lang="ts">
import { ref } from 'vue';
import { differenceInDays, format } from 'date-fns';
const hoje = new Date()
const tarefas = ref([
    {
        nome: 'Tarefa 1',
        responsavel: { nome: 'Responsável 1' },
        data_inicio: new Date('2021-10-01'),
        data_fim: new Date('2021-10-05'),
        status: 'Em andamento',
        id: 1,
        nivel: 1,
        num: 1,
        tarefas_filhas: []
    },
    {
        nome: 'Tarefa 2',
        responsavel: { nome: 'Responsável 1' },
        data_inicio: new Date('2021-10-03'),
        data_fim: new Date('2021-10-05'),
        status: 'Atrasado',
        id: 2,
        nivel: 2,
        num: 2,
        tarefas_filhas: []
    },
    {
        nome: 'Tarefa 3',
        responsavel: { nome: 'Responsável 1' },
        data_inicio: new Date('2021-10-06'),
        data_fim: new Date('2021-10-10'),
        status: 'Concluído',
        id: 3,
        nivel: 1,
        num: 2,
        tarefas_filhas: []
    },
    {
        nome: 'Tarefa 4',
        responsavel: { nome: 'Responsável 1' },
        data_inicio: new Date('2021-10-11'),
        data_fim: new Date('2021-10-15'),
        status: 'Concluído',
        id: 4,
        nivel: 1,
        num: 2,
        tarefas_filhas: []
    }
])
const projeto = ref({
    nome: 'Projeto Teste',
    data_inicio: new Date('2021-10-01'),
    data_fim: new Date('2021-10-10'),
})
const marcos = ref([
    { nome: 'Marco 1' },
])

const duracaoProjetoExibicao = ref(15)
const diasDaUltimaSemana = ref(0)
const diasDaPrimeiraSemana = ref(5)
const qtdSemanasInteiras = ref(0)
const getListaDias = (dataInicio: Date, dataFim: Date) => {
    const listaDias = []
    for (let i = 0; i <= differenceInDays(dataFim, dataInicio); i++) {
        listaDias.push(new Date(dataInicio.getTime() + i * 24 * 60 * 60 * 1000))
    }
    return listaDias
}


const colorClass: { [key: string]: string } = {
    'Em andamento': 'blue-500',
    'Concluído': 'green-500',
    'Atrasado': 'red-500',
    'grey': 'grey-500'
}

const distanciaAteInicioProjeto = (date: Date) => differenceInDays(date, projeto.value.data_inicio)
const verificaAtraso = (date: Date) => differenceInDays(date, hoje) < 0

</script>