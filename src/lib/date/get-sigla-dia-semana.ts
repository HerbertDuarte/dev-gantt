import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function obterSiglaDia(data: Date) {
    const diaSemanaCompleto = format(data, 'EEEE', { locale: ptBR });

    switch (diaSemanaCompleto) {
        case 'segunda-feira':
            return 'S';
        case 'terça-feira':
            return 'T';
        case 'quarta-feira':
            return 'Q';
        case 'quinta-feira':
            return 'Q';
        case 'sexta-feira':
            return 'S';
        case 'sábado':
            return 'S';
        case 'domingo':
            return 'D';
        default:
            return '';
    }
}
