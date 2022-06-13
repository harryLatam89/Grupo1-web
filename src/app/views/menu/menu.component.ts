import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Menu } from 'src/app/models/Menu';
import { Utils } from 'src/app/utils/utilidades';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public menusList: Array<Menu> = [];
  public menuSeleccionado: Menu = Utils.menuVacio();
  public innerWidths = '0';

  constructor(
    private dialogRef: MatDialogRef<MenuComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      idUsuario: number
    }) { this.innerWidths = (window.innerWidth * 0.8) + 'px'; }

  ngOnInit(): void {
    this.cargarMenusDeUsuario();
  }

  cargarMenusDeUsuario() {
    this.menusList.push(new Menu(1, '/entrada/vacantes', 'Vacantes'));
    this.menusList.push(new Menu(2, '/entrada/candidato', 'Datos de Candidato'));
    this.menusList.push(new Menu(2, '/entrada/administracion', 'Administracion de Roles'));
    this.menusList.push(new Menu(3, '/login', 'cerrar sesion'));
    
  }

  redirigirMenu(dir: string) {
    let response: any = {};
    response.url = dir;
    this.dialogRef.close(response);
  }

}
