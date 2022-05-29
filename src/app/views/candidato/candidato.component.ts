import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AreaLaboral } from '../../models/AreaLaboral';
import { Candidato } from '../../models/Candidato';
import { CompetenciaCandidato } from '../../models/CompetenciaCandidato';
import { Competencias } from '../../models/Competencias';
import { Usuario } from '../../models/Usuario';
import { AreaLaboralService } from '../../services/AreaLaboralService';
import { CandidatoService } from '../../services/CandidatoService';
import { CompetenciaCandidatoService } from '../../services/CompetenciaCandidatoService';
import { CompetenciaService } from '../../services/CompetenciaService';
import { UsuarioService } from '../../services/UsuarioService';
import { Utils } from '../../utils/utilidades';

@Component({
  selector: 'app-candidato',
  templateUrl: './candidato.component.html',
  styleUrls: ['./candidato.component.css']
})
export class CandidatoComponent implements OnInit {

  public candidatoForm: FormGroup;
  public usuarioForm: FormGroup;
  public competenciasForm: FormGroup;
  public competenciasList: Array<Competencias> = [];
  public areaLaboralList: Array<AreaLaboral> = [];
  public competenciasCandidatoList: Array<CompetenciaCandidato> = [];
  private candidato: Candidato = Utils.candodatoVacio();

  constructor(
    private competenciaCandidatoService: CompetenciaCandidatoService,
    private candidatoService: CandidatoService,
    private usuarioService: UsuarioService,
    private competenciaService: CompetenciaService,
    private areaLaboralService: AreaLaboralService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private formBuilder: FormBuilder
  ) {
    this.candidatoForm = this.formBuilder.group({
      arealaboral: [0, [Validators.required, Validators.min(1)]],
      laborando: [false, [Validators.required]]
    });
    this.usuarioForm = this.formBuilder.group({
      correo: ['', [Validators.required]],
      telefono: ['', [Validators.required]]
    });
    this.competenciasForm = this.formBuilder.group({
      competencia: [0, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.cargarAreasLaborales();
    this.cargarCandidato();
    this.cargarCompetencias();
    this.cargarCompetenciasDeCandidato();
  }

  candidatoF(control: string) { return this.candidatoForm.get(control); }
  usuarioF(control: string) { return this.usuarioForm.get(control); }
  competenciasF(control: string) { return this.competenciasForm.get(control); }

  cargarCompetencias() {
    this.competenciasList = this.competenciaService.getList((response: Competencias[]) => { });
  }

  cargarAreasLaborales() {
    this.areaLaboralList = this.areaLaboralService.getList((response: AreaLaboral[]) => { });
  }

  cargarCandidato() {
    let usr = localStorage.getItem('usrnm');
    if (usr) {
      let userIniciado: Usuario = JSON.parse(usr);
      if (userIniciado && userIniciado.idUsario > 0) {
        this.candidatoService.buscarPorUsuario(userIniciado, this._snackBar, (candidatoFound: Candidato) => {
          if (candidatoFound && candidatoFound.idCandidato > 0) {
            this.candidatoForm = this.formBuilder.group({
              arealaboral: [candidatoFound.areaLaboral.idArea, [Validators.required, Validators.min(1)]],
              laborando: [candidatoFound.laborando, [Validators.required]]
            });
            this.usuarioForm = this.formBuilder.group({
              correo: [userIniciado.correo, [Validators.required]],
              telefono: [userIniciado.telefono, [Validators.required]]
            });
            this.candidato = candidatoFound;
          }
        });
      }
      else {
        // si no se reconoce el usuario se tiene que iniciar sesion
        this._router.navigate(['/login']);
      }
    }
    else {
      // si no se reconoce el usuario se tiene que iniciar sesion
      this._router.navigate(['/login']);
    }
  }

  cargarCompetenciasDeCandidato() {
    if (this.candidato && this.candidato.idCandidato > 0) {
      this.competenciasCandidatoList = this.competenciaCandidatoService.buscarPorCandidato(this.candidato, this._snackBar, (response: CompetenciaCandidato[]) => { });
    } else {
      let usr = localStorage.getItem('usrnm');
      if (usr) {
        let userIniciado: Usuario = JSON.parse(usr);
        if (userIniciado && userIniciado.idUsario > 0) {
          this.candidatoService.buscarPorUsuario(userIniciado, this._snackBar, (candidatoFound: Candidato) => {
            if (candidatoFound && candidatoFound.idCandidato > 0) {
              this.competenciasCandidatoList = this.competenciaCandidatoService.buscarPorCandidato(this.candidato, this._snackBar, (response: CompetenciaCandidato[]) => { });
              this.candidato = candidatoFound;
            }
          });
        }
        else {
          // si no se reconoce el usuario se tiene que iniciar sesion
          this._router.navigate(['/login']);
        }
      }
      else {
        // si no se reconoce el usuario se tiene que iniciar sesion
        this._router.navigate(['/login']);
      }
    }
  }

  registrarCompetenciaDeCandidato() {
    if (this.validarDatosCompetencia()) {
      if (!this.validarExistenciaCompetencia(this.competenciasF('competencia')?.value)) {
        let competencia: Competencias = Utils.competenciaVacia();
        this.competenciasList.filter(objeto => objeto?.idCompetencia == this.competenciasF('competencia')?.value).forEach(objeto => competencia = objeto);
        if (this.candidato && this.candidato.idCandidato > 0 && competencia && competencia.idCompetencia > 0) {
          this.competenciaCandidatoService.creteOne(new CompetenciaCandidato(0, this.candidato, competencia), (response: boolean) => {
            if (response) {
              this.cargarCompetenciasDeCandidato();
            }
          });
        }
      } else {
        Utils.openSnackBar('La competencia ya esta registrada', 'ok', this._snackBar);
      }
    }
  }

  actualizarDatosCandidato() {
    if (this.validarDatosCandidato()) {
      if (this.candidato && this.candidato.idCandidato > 0) {
        let areaLaboralSeleccionada = this.candidatoF('arealaboral')?.value;
        let laborandoValue = this.candidatoF('laborando')?.value;
        if (areaLaboralSeleccionada && areaLaboralSeleccionada > 0) {
          this.areaLaboralList.filter(area => area.idArea == areaLaboralSeleccionada).forEach(area => this.candidato.areaLaboral = area);
          this.candidato.laborando = laborandoValue;
          this.candidatoService.editOne(this.candidato, (response: boolean) => {
            this.cargarCandidato();
          });
        }
      }
    }
  }

  actualizarDatosUsuario() {
    if (this.validarDatosUsuario()) {
      let usr = localStorage.getItem('usrnm');
      if (usr) {
        let userIniciado: Usuario = JSON.parse(usr);
        if (userIniciado && userIniciado.idUsario > 0) {
          userIniciado.telefono = this.usuarioF('telefono')?.value;
          userIniciado.correo = this.usuarioF('correo')?.value;
          this.usuarioService.editOne(userIniciado, (response: boolean) => {
            this.usuarioService.iniciarSesion(userIniciado, this._snackBar, (response: boolean) => { })
          });
        } else {
          // si no se reconoce el usuario se tiene que iniciar sesion
          this._router.navigate(['/login']);
        }
      }
    }
  }

  validarDatosCandidato(): boolean {
    return this.candidatoForm.valid ? true : false;
  }

  validarDatosUsuario(): boolean {
    return this.usuarioForm.valid ? true : false;
  }

  validarDatosCompetencia(): boolean {
    return this.competenciasForm.valid ? true : false;
  }

  validarExistenciaCompetencia(competenciaId: number): boolean {
    let existe = false;
    this.competenciasCandidatoList.filter(objeto => objeto?.competencia?.idCompetencia == competenciaId).forEach(objeto => existe = true);
    return existe;
  }

  compareIds(id1: any, id2: any): boolean {
    return id1 === id2;
  }

}
