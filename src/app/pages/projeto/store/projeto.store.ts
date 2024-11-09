import { defineStore } from 'pinia';
import { fakeProjetos } from '../../gantt/store/fakedb';
import { ref } from 'vue';

export type Projeto = {
    id: string;
    nome: string;
    descricao: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
};

export type ProjetoDetails = {
    duracaoProjetoExibicao: number;
    diasDaUltimaSemana: number;
    diasDaPrimeiraSemana: number;
    qtdSemanasInteiras: number;
};

export const useProjetoStore = defineStore('projeto', () => {
    const projeto = ref<Projeto>(fakeProjetos[0]);
    const projetos = ref<Projeto[]>(fakeProjetos);

    return {
        projetos,
        projeto,
    };
});
