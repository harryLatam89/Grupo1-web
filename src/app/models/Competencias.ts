import { AreaLaboral } from "./AreaLaboral";
import { Candidato } from "./Candidato";
import { Usuario } from "./Usuario";

export class Competencias {
    constructor(
        public idCompetencia: number,
        public areaLaboral: AreaLaboral,
        public nombreCompetencia: string,
    ) {
    }
}