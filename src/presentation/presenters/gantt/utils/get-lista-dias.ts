import { differenceInDays } from 'date-fns';

export const getListaDias = (dataInicio: Date, dataFim: Date) => {
    const listaDias = [];
    for (let i = 0; i <= differenceInDays(dataFim, dataInicio); i++) {
        listaDias.push(
            new Date(dataInicio.getTime() + i * 24 * 60 * 60 * 1000),
        );
    }
    return listaDias;
};
