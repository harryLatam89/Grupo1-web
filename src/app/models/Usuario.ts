export class Usuario {
  constructor(
    public idUsario: number,
    public nombre: string,
    public apellido: string,
    public userName: string,
    public userPass: string,
    public codigoDocumento: string,
    public tipoDocumento: string,
    public fechaCreacion: Date,
    public correo: string,
    public telefono: string,
    public activo: boolean,
  ) {
  }
}