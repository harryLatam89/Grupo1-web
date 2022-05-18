import { AreaLaboral } from "./AreaLaboral";
import { Usuario } from "./Usuario";

export class Contratante {
  constructor(
    private idContratante: number,
    private usuario: Usuario,
    private areaAsignada: string,
  ) {
  }
}