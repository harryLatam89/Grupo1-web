import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-conformation',
  templateUrl: './conformation.component.html',
  styleUrls: ['./conformation.component.css']
})
export class ConformationComponent implements OnInit {

  public innerWidths = '0';
  public titulo: string = 'titulo vacio';
  public descripcion: string = 'texto vacio';

  constructor(
    private dialogRef: MatDialogRef<ConformationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      titulo: string,
      descripcion: string
    },
  ) {
    this.innerWidths = (window.innerWidth * 0.8) + 'px';
    this.titulo = data.titulo;
    this.descripcion = data.descripcion;
  }

  ngOnInit(): void {
  }

  aceptarCondicion() {
    let response:any = {};
    response.valor = 1;
    this.dialogRef.close(response);
  }

  rechazarCondicion() {
    let response:any = {};
    response.valor = 0;
    this.dialogRef.close(response);
  }

}
