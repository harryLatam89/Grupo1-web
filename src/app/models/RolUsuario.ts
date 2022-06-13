import { Rol } from "./Rol";
import { Usuario } from "./Usuario";

export class RolUsuario {
  constructor(
    public idRol: number,
    public usuario: Usuario,
    public rol: Rol
  ) {
  }
}