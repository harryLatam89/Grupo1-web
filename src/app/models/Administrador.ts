import { Usuario } from "./Usuario";

export class Administrador {
  constructor(
    private idAdministrador: number,
    private usuario: Usuario,
    private fechaExpiracion: Date,
  ) {
  }
}