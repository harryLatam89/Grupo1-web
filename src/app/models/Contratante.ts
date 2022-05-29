import { AreaLaboral } from "./AreaLaboral";
import { Usuario } from "./Usuario";

export class Contratante {
  constructor(
    public idContratante: number,
    public usuario: Usuario,
    public areaAsignada: string,
  ) {
  }
}