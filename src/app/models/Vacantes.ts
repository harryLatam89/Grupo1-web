import { Contratante } from "./Contratante";

export class Vacantes {
  constructor(
    public idVacante: number,
    public contratante: Contratante,
    public nombreVacante: string,
    public descripcion: string,
    public estado: number,
    public activo: boolean,
  ) {
  }
}