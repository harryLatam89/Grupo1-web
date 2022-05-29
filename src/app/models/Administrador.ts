import { Usuario } from "./Usuario";

export class Administrador {
  constructor(
    public idAdministrador: number,
    public usuario: Usuario,
    public fechaExpiracion: Date,
  ) {
  }
}