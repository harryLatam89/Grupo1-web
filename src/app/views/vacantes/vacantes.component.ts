import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Competencias } from 'src/app/models/Competencias';
import { Contratante } from 'src/app/models/Contratante';
import { CompetenciaService } from 'src/app/services/CompetenciaService';
import { ContratanteService } from 'src/app/services/ContratanteService';
import { VacanteService } from 'src/app/services/VacanteService';
import { Utils } from 'src/app/utils/utilidades';

@Component({
  selector: 'app-vacantes',
  templateUrl: './vacantes.component.html',
  styleUrls: ['./vacantes.component.css']
})
export class VacantesComponent implements OnInit {

  public vacanteForm: UntypedFormGroup;
  public competenciaForm: UntypedFormGroup;
  private competenciaSeleccionadaList: Array<Competencias> = [];
  private competenciasList: Array<Competencias> = [];
  private contratante: Contratante = Utils.contratanteVacio();

  constructor(
    private contratanteService: ContratanteService,
    private vacanteService: VacanteService,
    private competenciaService: CompetenciaService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private formBuilder: UntypedFormBuilder
  ) {
    this.vacanteForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
    });
    this.competenciaForm = this.formBuilder.group({
      competencia: [0, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    this.cargarContratante()
    this.cargarCompetencia();
  }

  cargarCompetencia() {
    this.competenciasList = this.competenciaService.getList(list => { });
  }

  cargarContratante(){
    this.contratanteService
  }

}
