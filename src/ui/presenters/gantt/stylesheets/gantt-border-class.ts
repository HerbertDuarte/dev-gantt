import { isSunday } from 'date-fns';

export function ganttBorder(diaDeProjeto: Date) {
    if (isSunday(diaDeProjeto)) return 'border-l border-gray-200';
    return 'border-l border-gray-50';
}
