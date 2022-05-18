export class Usuario {
  constructor(
    private idUsario: number,
    private nombre: string,
    private apellido: string,
    private userName: string,
    private userPass: string,
    private codigoDocumento: string,
    private tipoDocumento: string,
    private fechaCreacion: Date,
    private activo: boolean,
  ) {
  }
}