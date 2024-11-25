import { UsuarioSituacao } from '../../../../domain/enum/usuario-situacao.enum';

export type SituacaoOption = {
    label: string;
    value: UsuarioSituacao;
};

export const situacaoOptions: SituacaoOption[] = [
    {
        label: 'Ativo',
        value: UsuarioSituacao.Ativo,
    },
    {
        label: 'Inativo',
        value: UsuarioSituacao.Inativo,
    },
];

export class SituacaoOptionUtil {
    static toOption(value: UsuarioSituacao) {
        return situacaoOptions.find(
            (option) => option.value === value,
        ) as SituacaoOption;
    }

    static toValue(label: string) {
        return situacaoOptions.find((option) => option.label === label)?.value;
    }
}
