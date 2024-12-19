import { Usuario } from '../../../../../../domain/entities/usuario';

export type CreateTarefaDto = {
    nome: string;
    marcoId: any;
    responsaveis: Usuario[];
    descricao?: string;
};
