import { UsuarioSituacao } from '../../../../domain/enum/usuario-situacao.enum';
import { SituacaoOption } from '../utils/situacao-options';

export interface FormUpdateUsuarioDto {
    nome: string;
    email: string;
    situacao: SituacaoOption;
    login: string;
    senhaAntiga?: string;
    senhaNova?: string;
}
