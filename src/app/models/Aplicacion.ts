import { Candidato } from "./Candidato";
import { Usuario } from "./Usuario";
import { Vacantes } from "./Vacantes";

export class Aplicacion {
  constructor(
    private idAplicacion: number,
    private candidato: Candidato,
    private vacante: Vacantes,
  ) {
  }
}