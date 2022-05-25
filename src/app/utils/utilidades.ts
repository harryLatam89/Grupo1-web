import { MatDialogConfig } from "@angular/material/dialog";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";
import { Usuario } from "../models/Usuario";

export class Utils {
    public static usuarioPrueba(): Usuario {
        return new Usuario(0, 'cesar', 'goemz', 'cesar', '1234567', '056893126', 'DUI', new Date(), 'cesar@cesar.com', '70149398', true);
    }

    static snackBarConfig(): MatSnackBarConfig {
        let snackConfig: MatSnackBarConfig = new MatSnackBarConfig();
        snackConfig.duration = 12000;
        snackConfig.panelClass = ['btn', 'btn-outline-dark'];
        return snackConfig;
      }
    
      static openSnackBar(message: string, action: string, snackBar: MatSnackBar) {
        let snackConfig= Utils.snackBarConfig();
        snackBar.open(message, action, snackConfig);
      }
    
      static getMatDialogConf(): MatDialogConfig {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        return dialogConfig;
      }
}