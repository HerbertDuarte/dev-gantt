import { UsuarioSituacao } from '../../../../domain/enum/usuario-situacao.enum';

type Option = {
    label: string;
    value: UsuarioSituacao;
};

export const situacaoOptions: Option[] = [
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
    return situacaoOptions.find((option) => option.value === value) as Option;
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
