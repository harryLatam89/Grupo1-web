import { AreaLaboral } from "./AreaLaboral";
import { Candidato } from "./Candidato";
import { Competencias } from "./Competencias";
import { Usuario } from "./Usuario";
import { Vacantes } from "./Vacantes";

export class CompetenciaVacante {
    constructor(
        public idCompetencia: number,
        public vacante: Vacantes,
        public competencia: Competencias,
    ) {
    }
}