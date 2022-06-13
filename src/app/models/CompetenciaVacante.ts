import { Competencias } from "./Competencias";
import { Vacantes } from "./Vacantes";

export class CompetenciaVacante {
    constructor(
        public idCompetencia: number,
        public vacante: Vacantes,
        public competencia: Competencias,
    ) {
    }
}