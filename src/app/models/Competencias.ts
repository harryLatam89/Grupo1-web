import { AreaLaboral } from "./AreaLaboral";
import { Candidato } from "./Candidato";
import { Usuario } from "./Usuario";

export class Competencias {
    constructor(
        private idCompetencia: number,
        private areaLaboral: AreaLaboral,
        private nombreCompetencia: string,
    ) {
    }
}