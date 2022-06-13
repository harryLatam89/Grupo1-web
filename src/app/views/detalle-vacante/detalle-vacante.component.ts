import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Competencias } from 'src/app/models/Competencias';
import { Vacantes } from 'src/app/models/Vacantes';
import { CompetenciaVacanteService } from 'src/app/services/CompetenciaVacanteService';
import { VacanteService } from 'src/app/services/VacanteService';
import { Utils } from 'src/app/utils/utilidades';

@Component({
  selector: 'app-detalle-vacante',
  templateUrl: './detalle-vacante.component.html',
  styleUrls: ['./detalle-vacante.component.css']
})
export class DetalleVacanteComponent implements OnInit {

  public vacante: Vacantes = Utils.vacanteVacio();
  public competenciaSeleccionadaList: Array<Competencias> = [];
  public innerWidths = '0';

  constructor(
    private _snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<DetalleVacanteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      idVacante: number
    },
    private vacanteService: VacanteService,
    private competenciaVacanteService: CompetenciaVacanteService
  ) {
    this.innerWidths = (window.innerWidth*0.8)+ 'px';
    if (data.idVacante > 0) {
      this.vacanteService.getOneById(data.idVacante, resp => {
        if (resp && resp.idVacante && resp.idVacante > 0) this.vacante = resp;
        if (this.vacante.idVacante > 0){
          this.competenciaVacanteService.listaCompetenciasDeVacante(this.vacante,this._snackBar, lista => {
            this.competenciaSeleccionadaList = lista;
          })
        }
      })
    }
  }

  ngOnInit(): void {
  }

}
