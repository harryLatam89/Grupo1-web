import { AreaLaboral } from "./AreaLaboral";
import { Candidato } from "./Candidato";
import { Competencias } from "./Competencias";
import { Usuario } from "./Usuario";

export class CompetenciaCandidato {
    constructor(
        public idCompetencia: number,
        public candidato: Candidato,
        public competencia: Competencias,
    ) {
    }
}