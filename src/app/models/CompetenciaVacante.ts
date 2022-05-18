import { AreaLaboral } from "./AreaLaboral";
import { Candidato } from "./Candidato";
import { Competencias } from "./Competencias";
import { Usuario } from "./Usuario";
import { Vacantes } from "./Vacantes";

export class CompetenciaVacante {
    constructor(
        private idCompetencia: number,
        private vacante: Vacantes,
        private competencia: Competencias,
    ) {
    }
}