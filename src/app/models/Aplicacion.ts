import { Candidato } from "./Candidato";
import { Usuario } from "./Usuario";
import { Vacantes } from "./Vacantes";

export class Aplicacion {
  constructor(
    public idAplicacion: number,
    public candidato: Candidato,
    public vacante: Vacantes,
  ) {
  }
}