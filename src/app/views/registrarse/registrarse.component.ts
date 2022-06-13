import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationExtras, Router } from '@angular/router';
import { AreaLaboral } from '../../models/AreaLaboral';
import { Candidato } from '../../models/Candidato';
import { Usuario } from '../../models/Usuario';
import { CandidatoService } from '../../services/CandidatoService';
import { UsuarioService } from '../../services/UsuarioService';
import { Utils } from '../../utils/utilidades';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.css']
})
export class RegistrarseComponent implements OnInit {

  public registrarseForm: UntypedFormGroup;
  public loginForm: UntypedFormGroup;

  constructor(
    private usuarioService: UsuarioService,
    private candidatoService: CandidatoService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private formBuilder: UntypedFormBuilder
  ) {
    this.registrarseForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      userName: ['', [Validators.required]],
      userPass: ['', [Validators.required, Validators.minLength(6)]],
      codigoDocumento: ['', [Validators.required]],
      tipoDocumento: ['', [Validators.required]],
      fechaCreacion: [new Date(), [Validators.required]],
      correo: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
    });
    this.loginForm = this.formBuilder.group({
      usuario: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    localStorage.clear();
  }

  registrarseF(control: string) { return this.registrarseForm.get(control); }

  loginF(control: string) { return this.loginForm.get(control); }

  iniciarSesion() {
    if (this.loginForm.valid) {
      let usuario: Usuario = Utils.usuarioPrueba();
      usuario.userName = this.loginF('usuario')?.value;
      usuario.userPass = this.loginF('password')?.value;
      this.usuarioService.iniciarSesion(usuario, this._snackBar, (response: boolean) => {
        let navigationExtras: NavigationExtras = {
          queryParams: {
            "car": true
          }
        };
        this._router.navigate(['/entrada'], navigationExtras);
      });
    } else {
      Utils.openSnackBar('Ocurrio un error al validar los datos', 'ok', this._snackBar);
    }
  }

  registrarse() {
    if (this.registrarseForm.valid) {
      let usuario: Usuario = new Usuario(0,
        this.registrarseF('nombre')?.value, this.registrarseF('apellido')?.value,
        this.registrarseF('userName')?.value, this.registrarseF('userPass')?.value,
        this.registrarseF('codigoDocumento')?.value, this.registrarseF('tipoDocumento')?.value,
        this.registrarseF('fechaCreacion')?.value, this.registrarseF('correo')?.value,
        this.registrarseF('telefono')?.value, true
      );
      let candidato: Candidato = new Candidato(0, usuario, new AreaLaboral(1, 'are1'), false);
      this.candidatoService.creteOne(candidato, (response: Candidato) => {
        if (response && response?.idCandidato > 0) {
          Utils.openSnackBar('Cliente Registrado', 'ok', this._snackBar);
        } else {
          Utils.openSnackBar('Ocurrio un error al registrar usuario', 'ok', this._snackBar);
        }
      });
    } else {
      Utils.openSnackBar('Ocurrio un error al validar los datos', 'ok', this._snackBar);
    }
  }

}
