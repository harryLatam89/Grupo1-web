import { MatDialogConfig } from "@angular/material/dialog";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";
import { AreaLaboral } from "../models/AreaLaboral";
import { Candidato } from "../models/Candidato";
import { Competencias } from "../models/Competencias";
import { Contratante } from "../models/Contratante";
import { Usuario } from "../models/Usuario";

export class Utils {
  public static usuarioPrueba(): Usuario {
    return new Usuario(0, 'preuba', 'prueba', 'prueba', '1234567', '01234567-8', 'DUI', new Date(), 'prueba@prueba.com', '77227722', true);
  }

  public static competenciaVacia(): Competencias {
    return new Competencias(0, new AreaLaboral(0, 'vacio'), 'vacio');
  }

  public static candodatoVacio(): Candidato {
    return new Candidato(0, Utils.usuarioPrueba(), new AreaLaboral(0, 'vacio'), false);
  }

  public static contratanteVacio(): Contratante {
    return new Contratante(0, Utils.usuarioPrueba(), 'vacio');
  }

  static snackBarConfig(): MatSnackBarConfig {
    let snackConfig: MatSnackBarConfig = new MatSnackBarConfig();
    snackConfig.duration = 12000;
    snackConfig.panelClass = ['btn', 'btn-outline-dark'];
    return snackConfig;
  }

  static openSnackBar(message: string, action: string, snackBar: MatSnackBar) {
    let snackConfig = Utils.snackBarConfig();
    snackBar.open(message, action, snackConfig);
  }

  static getMatDialogConf(): MatDialogConfig {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    return dialogConfig;
  }
}