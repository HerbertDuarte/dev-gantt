import { Marco } from './marco';

type ProjetoProps = {
    id: string;
    nome: string;
    descricao: string;
    createdAt: string;
    updatedAt: string;
    marcos: Marco[];
};

export class Projeto {
    id: string = '';
    nome: string = '';
    descricao: string = '';
    createdAt: Date = new Date();
    updatedAt: Date = new Date();
    marcos: Marco[] = [];

    constructor(data: Partial<ProjetoProps> = {}) {
        Object.assign(this, {
            ...data,
            createdAt: data.createdAt && new Date(data.createdAt),
            updatedAt: data.updatedAt && new Date(data.updatedAt),
        });
    }
}
