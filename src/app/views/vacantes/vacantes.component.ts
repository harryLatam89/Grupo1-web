import { Component, OnInit } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Candidato } from 'src/app/models/Candidato';
import { Competencias } from 'src/app/models/Competencias';
import { CompetenciaVacante } from 'src/app/models/CompetenciaVacante';
import { Contratante } from 'src/app/models/Contratante';
import { Usuario } from 'src/app/models/Usuario';
import { Vacantes } from 'src/app/models/Vacantes';
import { CandidatoService } from 'src/app/services/CandidatoService';
import { CompetenciaService } from 'src/app/services/CompetenciaService';
import { CompetenciaVacanteService } from 'src/app/services/CompetenciaVacanteService';
import { ContratanteService } from 'src/app/services/ContratanteService';
import { VacanteService } from 'src/app/services/VacanteService';
import { Utils } from 'src/app/utils/utilidades';
import { ConformationComponent } from '../conformation/conformation.component';
import { DetalleVacanteComponent } from '../detalle-vacante/detalle-vacante.component';

@Component({
  selector: 'app-vacantes',
  templateUrl: './vacantes.component.html',
  styleUrls: ['./vacantes.component.css']
})
export class VacantesComponent implements OnInit {

  public vacanteForm: UntypedFormGroup;
  public filtroCandidatoForm: UntypedFormGroup;
  public filtroContratanteForm: UntypedFormGroup;
  public competenciaForm: UntypedFormGroup;
  public competenciaSeleccionadaList: Array<Competencias> = [];
  public competenciasList: Array<Competencias> = [];
  public vacanteList: Array<Vacantes> = [];
  public contratante: Contratante = Utils.contratanteVacio();
  public vacanteSeleccionada: Vacantes = Utils.vacanteVacio();

  // filtros contratante
  public verDeOtros = new FormControl(false);
  public verDesactivados = new FormControl(false);
  public verOcupados = new FormControl(false);

  public VACANTE_ESTADO_COMPLETO = 3;
  public VACANTE_ESTADO_DESACTIVADO = 5;

  constructor(
    private contratanteService: ContratanteService,
    private vacanteService: VacanteService,
    private competenciaService: CompetenciaService,
    private competenciaVacanteService: CompetenciaVacanteService,
    private candidatoService: CandidatoService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private formBuilder: UntypedFormBuilder
  ) {
    this.vacanteForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
    });
    this.filtroContratanteForm = this.formBuilder.group({
      verDeOtros: [new FormControl(false), [Validators.required]],
    });
    this.filtroCandidatoForm = this.formBuilder.group({
      buscar: ['', [Validators.required]],
    });
    this.competenciaForm = this.formBuilder.group({
      competencia: [0, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    this.cargarContratante();
    this.cargarCompetencias();
    this.cargarVacantesDeContratante();
    this.limpiarListasEditables()
  }

  vacanteF(control: string) { return this.vacanteForm.get(control); }
  competenciaF(control: string) { return this.competenciaForm.get(control); }
  filtroContratanteF(control: string) { return this.filtroContratanteForm.get(control); }
  filtroCandidatoF(control: string) { return this.filtroCandidatoForm.get(control); }

  cargarCompetencias() {
    this.competenciasList = this.competenciaService.getList(list => { });
  }



  contratanteFiltroVerTodos(event: any) {
    if (event) {
      this.verDesactivados = new FormControl(false);
      this.verOcupados = new FormControl(false);
      if (this.contratante?.idContratante > 0) {
        this.vacanteService.getList(list => {
          this.vacanteList = list;
        });
      }
    }
  }
  contratanteFiltroVerDesactivados(event: any) {
    this.vacanteList = [];
    if (event) {
      this.verDeOtros = new FormControl(false);
      this.verOcupados = new FormControl(false);
      if (this.contratante?.idContratante > 0) {
        this.vacanteService.listaVacantesDeContratanteDesactivados(this.contratante, this._snackBar, list => {
          this.vacanteList = list;
        });
      }
    }
  }
  contratanteFiltroVerOcupados(event: any) {
    this.vacanteList = [];
    if (event) {
      this.verDesactivados = new FormControl(false);
      this.verDeOtros = new FormControl(false);
      if (this.contratante?.idContratante > 0) {
        this.vacanteService.listaVacantesDeContratanteOcupados(this.contratante, this._snackBar, list => {
          this.vacanteList = list;
        });
      }
    }
  }

  cargarVacantesCandidato() {
    this.vacanteList = [];
    let usr = localStorage.getItem('usrnm');
    if (usr) {
      let userIniciado: Usuario = JSON.parse(usr);
      if (userIniciado && userIniciado.idUsario > 0) {
        this.candidatoService.buscarPorUsuario(userIniciado, this._snackBar, (candidatoFound: Candidato) => {
          if (candidatoFound && candidatoFound.idCandidato > 0) {
            this.vacanteService.listaVacantesDeCandidato(candidatoFound, this._snackBar, list => {
              this.vacanteList = list;
            })
          }
        });
      }
    }
  }

  cargarVacantesDeContratante() {
    if (this.contratante?.idContratante > 0) {
      this.vacanteService.listaVacantesDeContratante(this.contratante, this._snackBar, list => {
        this.vacanteList = list;
      });
    } else {
      this.vacanteService.getList(list => this.vacanteList = list);
    }
  }

  cargarContratante() {
    let usr = localStorage.getItem('usrnm');
    if (usr) {
      let userIniciado: Usuario = JSON.parse(usr);
      if (userIniciado && userIniciado.idUsario > 0) {
        this.contratanteService.buscarContratantePorUsuario(userIniciado, this._snackBar, (contratanteFound: Contratante) => {
          if (contratanteFound && contratanteFound.idContratante > 0) {
            this.contratante = contratanteFound;
            this.cargarVacantesDeContratante();
          }
        });
      }
      else {
        console.log('salida por user iniciado con id 0', userIniciado)
        // si no se reconoce el usuario se tiene que iniciar sesion
        this._router.navigate(['/login']);
      }
    }
    else {
      console.log('salida por user no encontrado en local storage')
      // si no se reconoce el usuario se tiene que iniciar sesion
      this._router.navigate(['/login']);
    }
  }

  guardarVacante() {
    if (this.vacanteSeleccionada && this.vacanteSeleccionada.idVacante > 0)
      this.editarVacanteNoOcupada();
    else
      this.nuevaVacante();
  }

  nuevaVacante() {
    if (this.vacanteForm.valid) {
      if (this.contratante?.idContratante > 0) {
        let nuevaVacante: Vacantes = new Vacantes(0, this.contratante, this.vacanteF('nombre')?.value, this.vacanteF('descripcion')?.value, 0, true);
        let competenciasNuevaVacante: Array<Competencias> = this.competenciaSeleccionadaList;
        if (competenciasNuevaVacante.length > 0) {
          this.vacanteService.creteOne(nuevaVacante, (creado: Vacantes) => {
            var nuveasCompetenciaVacante: Array<CompetenciaVacante> = [];
            competenciasNuevaVacante.forEach(comp => {
              nuveasCompetenciaVacante.push(new CompetenciaVacante(0, creado, comp));
            })
            if (nuveasCompetenciaVacante.length > 0) {
              nuveasCompetenciaVacante.forEach(cnv => this.competenciaVacanteService.creteOne(cnv, ok => { }))
            }
            this.cargarVacantesDeContratante();
          })
        } else {
          Utils.openSnackBar('Selecciona una competencia para crear la vacante', 'ok', this._snackBar);
        }
      }
    }
  }

  seleccionarVacante(idVacante: number) {
    this.limpiarListasEditables();
    this.vacanteService.getOneById(idVacante, response => {
      if (response && response?.idVacante > 0) {
        this.vacanteSeleccionada = response;
        if (this.vacanteSeleccionada.estado < this.VACANTE_ESTADO_COMPLETO) {
          this.vacanteForm = this.formBuilder.group({
            nombre: [this.vacanteSeleccionada?.nombreVacante, [Validators.required]],
            descripcion: [this.vacanteSeleccionada?.descripcion, [Validators.required]],
          });
          this.competenciaVacanteService.listaCompetenciasDeVacante(this.vacanteSeleccionada, this._snackBar, list => {
            this.competenciaSeleccionadaList = list;
          })
        }
      } else {
        this.vacanteSeleccionada = Utils.vacanteVacio();
      }
    })
  }

  desactivarVacante(vacanteId: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      titulo: 'Desactivar vacante',
      descripcion: '¿Esta seguro que quiere desactivat la vacante? una vez realizada la operacion no podra editarla ni modificarla'
    };
    const dialogRef = this.dialog.open(ConformationComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      result => {
        if (result && result.valor == 1) {
          this.limpiarListasEditables();
          this.vacanteForm = this.formBuilder.group({
            nombre: ['', [Validators.required]],
            descripcion: ['', [Validators.required]],
          });
          this.vacanteSeleccionada = Utils.vacanteVacio();
          this.vacanteService.getOneById(vacanteId, response => {
            if (response && response?.idVacante > 0 && response?.estado < this.VACANTE_ESTADO_COMPLETO) {
              response.estado = this.VACANTE_ESTADO_DESACTIVADO;
              response.activo = false;
              this.vacanteService.editOne(response, listener => this.cargarVacantesDeContratante());
            } else {
              Utils.openSnackBar('No se puede cancelar vacante, contacte a un administrador para resolver el caso', 'ok', this._snackBar);
            }
          })
        }
      });
  }

  editarVacanteNoOcupada() {
    if (this.vacanteSeleccionada?.idVacante > 0) {
      if (this.vacanteForm.valid) {
        this.vacanteSeleccionada.nombreVacante = this.vacanteF('nombre')?.value;
        this.vacanteSeleccionada.descripcion = this.vacanteF('descripcion')?.value;
        this.vacanteService.editOne(this.vacanteSeleccionada, ok => {
          Utils.openSnackBar('Vacante actualizada', 'ok', this._snackBar);
        })
      }
    }
  }

  agregarCompetenciasAVanteNoOcupada() {
    if (this.competenciaForm.valid) {
      var yaExisteCompetenciaSeleccionada: boolean = false;
      this.competenciaSeleccionadaList.filter(comp => comp.idCompetencia == this.competenciaF('competencia')?.value).forEach(comp => {
        yaExisteCompetenciaSeleccionada = true;
      })
      if (yaExisteCompetenciaSeleccionada)
        Utils.openSnackBar('La competencia ya ha sido agregada', 'ok', this._snackBar);
      else {
        var competenciaAgregar: Competencias = Utils.competenciaVacia();
        this.competenciasList.filter(comp => comp.idCompetencia == this.competenciaF('competencia')?.value).forEach(comp => competenciaAgregar = comp);
        if (competenciaAgregar && competenciaAgregar?.idCompetencia > 0) {
          var debeRegistrarse: boolean = false;
          if (this.contratante && this.contratante.idContratante > 0 && this.vacanteSeleccionada && this.vacanteSeleccionada.idVacante > 0 && this.vacanteSeleccionada.estado < this.VACANTE_ESTADO_COMPLETO) {
            debeRegistrarse = true;
            this.competenciaVacanteService.creteOne(new CompetenciaVacante(0, this.vacanteSeleccionada, competenciaAgregar), ncomp => {
              this.competenciaSeleccionadaList.push(competenciaAgregar);
            })
          } else {
            Utils.openSnackBar('La vacante ya ha sido ocupada o cancelada', 'ok', this._snackBar);
          }
          if (!debeRegistrarse) this.competenciaSeleccionadaList.push(competenciaAgregar);
        }
      }
    }
  }

  limpiarListasEditables() {
    this.competenciaSeleccionadaList = [];
  }

  compareIds(id1: any, id2: any): boolean {
    return id1 === id2;
  }

  verVacante(event: number) {
    console.log('id vacante a ver', event);
    var vacanteBuscar = Utils.vacanteVacio();
    this.vacanteList.filter(vac => vac.idVacante == event).forEach(vac => vacanteBuscar = vac);
    console.log('vacante foind', vacanteBuscar);
    if (this.contratante && vacanteBuscar.idVacante == event && this.contratante.idContratante == vacanteBuscar.contratante.idContratante && vacanteBuscar.estado < this.VACANTE_ESTADO_COMPLETO && vacanteBuscar.activo) {
      this.seleccionarVacante(event);
    } else {
      this.dialogoDetalleVacante(event);
    }
  }

  dialogoDetalleVacante(vacanteId: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      idVacante: vacanteId
    };
    const dialogRef = this.dialog.open(DetalleVacanteComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      result => {
        // none
      });
  }

}
