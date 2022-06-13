import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Rol } from 'src/app/models/Rol';
import { RolUsuario } from 'src/app/models/RolUsuario';
import { Usuario } from 'src/app/models/Usuario';
import { RolService } from 'src/app/services/RolService';
import { RolUsuarioService } from 'src/app/services/RolUsuarioService';
import { UsuarioService } from 'src/app/services/UsuarioService';
import { Utils } from 'src/app/utils/utilidades';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.css']
})
export class AdministracionComponent implements OnInit {

  //forms
  public rolUsuarioForm: UntypedFormGroup;

  //selected
  public usuarioSeleccionado: Usuario = Utils.usuarioPrueba();

  //list
  public rolList: Array<Rol> = [];
  public rolUserList: Array<RolUsuario> = [];
  public usuarioList: Array<Usuario> = [];

  constructor(
    private rolService: RolService,
    private usuarioService: UsuarioService,
    private rolUsuarioService: RolUsuarioService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private formBuilder: UntypedFormBuilder
  ) {
    this.rolUsuarioForm = this.formBuilder.group({
      rol: [0, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.cargarRoles();
    this.cargarUsuarios();
  }

  rolUsuarioF(control: string) { return this.rolUsuarioForm.get(control); }

  cargarRoles() {
    this.rolService.getList(lista => this.rolList = lista);
  }

  cargarUsuarios() {
    this.usuarioService.getList(list => this.usuarioList = list);
  }

  seleccionarUsuario(idUsiaro: number) {
    this.rolUserList = [];
    if (idUsiaro > 0) {
      this.usuarioService.getOneById(idUsiaro, user => {
        if (user && user?.idUsario > 0) {
          this.usuarioSeleccionado = user;
          this.rolUsuarioService.cargarRolesDeUsuario(user, this._snackBar, list => {
            this.rolUserList = list;
          })
        }
      })
    }
  }

  asignarRolAUsuario() {
    if (this.usuarioSeleccionado && this.usuarioSeleccionado.idUsario > 0) {
      if (this.rolUsuarioForm.valid) {
        var yaExisteRolSeleccionado: boolean = false;
        this.rolUserList.filter(rol => rol.idRol == this.rolUsuarioF('rol')?.value).forEach(rol => {
          yaExisteRolSeleccionado = true;
        });
        if (yaExisteRolSeleccionado)
          Utils.openSnackBar('El Rol ya ha sido asignado', 'ok', this._snackBar);
        else {
          console.log('asdasd asd asd', this.rolUsuarioF('rol')?.value)
          var rolAgregar: Rol = new Rol(0, '');
          this.rolList.forEach(ro => { if (ro.idRol == this.rolUsuarioF('rol')?.value) rolAgregar = ro });
          if (rolAgregar && rolAgregar.idRol > 0) {
            console.log('asdasd asd asd 2 22')
            this.rolUsuarioService.creteOne(new RolUsuario(0, this.usuarioSeleccionado, rolAgregar), listener => {
              if (listener && listener?.idRol > 0) {
                this.rolUserList.push(listener);
              }
            });
          }
        }
      } else {
        Utils.openSnackBar('Elige un rol para agregar', 'ok', this._snackBar);
      }
    } else {
      Utils.openSnackBar('no se ha seleccionado usuario', 'ok', this._snackBar);
    }
  }
  compareIds(id1: any, id2: any): boolean {
    return id1 === id2;
  }


}
