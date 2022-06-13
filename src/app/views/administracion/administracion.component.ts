import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Rol } from 'src/app/models/Rol';
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
  }

  cargarRoles() {
    this.rolService.getList(lista => this.rolList = lista);
  }

  seleccionarUsuario(idUsiaro: number) {
    if (idUsiaro > 0) {
      this.usuarioService.getOneById(idUsiaro, user => {
        if (user && user?.idUsario > 0) {
          this.usuarioSeleccionado = user;
        }
      })
    }
  }



}
