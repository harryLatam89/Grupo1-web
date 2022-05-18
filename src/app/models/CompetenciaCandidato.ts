import { AreaLaboral } from "./AreaLaboral";
import { Candidato } from "./Candidato";
import { Competencias } from "./Competencias";
import { Usuario } from "./Usuario";

export class CompetenciaCandidato {
    constructor(
        private IdCompetencia: number,
        private candidato: Candidato,
        private competencia: Competencias,
    ) {
    }
}