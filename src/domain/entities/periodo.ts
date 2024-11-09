export class Periodo {
    duracaoProjetoExibicao: number = 0;
    diasDaUltimaSemana: number = 0;
    diasDaPrimeiraSemana: number = 0;
    qtdSemanasInteiras: number = 0;

    constructor(data: Partial<Periodo> = {}) {
        Object.assign(this, data);
    }
}
