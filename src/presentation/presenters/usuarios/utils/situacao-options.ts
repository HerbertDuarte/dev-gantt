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

export function toOption(value: UsuarioSituacao) {
    return situacaoOptions.find(
        (option) => option.value === value,
    ) as SituacaoOption;
}

export function toValue({
    label,
    value,
}: {
    label: string;
    value: UsuarioSituacao;
}) {
    return situacaoOptions.find((option) => option.label === label)?.value;
}
