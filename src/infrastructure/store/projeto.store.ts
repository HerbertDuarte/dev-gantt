import { defineStore } from 'pinia';
import { fakeProjetos } from './fakedb';
import { ref } from 'vue';
import { Projeto } from '../../domain/entities/projeto';

export const useProjetoStore = defineStore('projeto', () => {
    const projeto = ref<Projeto>(fakeProjetos[0]);
    const projetos = ref<Projeto[]>(fakeProjetos);

    return {
        projetos,
        projeto,
    };
});
