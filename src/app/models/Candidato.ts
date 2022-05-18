import { AreaLaboral } from "./AreaLaboral";
import { Usuario } from "./Usuario";

export class Candidato {
    constructor(
        private idCandidato: number,
        private usuario: Usuario,
        private areaLaboral: AreaLaboral,
        private laborando: boolean,
    ) {
    }
}