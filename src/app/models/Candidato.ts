import { AreaLaboral } from "./AreaLaboral";
import { Usuario } from "./Usuario";

export class Candidato {
    constructor(
        public idCandidato: number,
        public usuario: Usuario,
        public areaLaboral: AreaLaboral,
        public laborando: boolean,
    ) {
    }
}