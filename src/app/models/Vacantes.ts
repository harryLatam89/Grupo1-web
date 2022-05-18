import { Contratante } from "./Contratante";

export class Vacantes {
  constructor(
    private idVacante: number,
    private contratante: Contratante,
    private nombreVacante: string,
    private descripcion: string,
    private estado: number,
    private activo: boolean,
  ) {
  }
}