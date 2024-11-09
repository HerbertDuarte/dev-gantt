import { UsuarioNivel } from '../../../../domain/enum/usuario-nivel.enum';

export const nivelOptions = [
    { label: 'Todos', value: null },
    { label: 'Administrador', value: UsuarioNivel.Administrador },
    { label: 'Usuário', value: UsuarioNivel.Usuario },
];
