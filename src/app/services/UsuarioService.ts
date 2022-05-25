import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { lastValueFrom } from 'rxjs';
import { Usuario } from '../models/Usuario';
import { EntityParser } from '../utils/entity.parser';
import { Utils } from '../utils/utilidades';
import { AbSerbice } from './abs/abstract.service';
import { RestService } from './abs/rest.service';
import { Zurlrest } from './abs/zurlrest';

@Injectable()
export class UsuarioService extends AbSerbice<Usuario> {

    private url: string = Zurlrest.contratante;

    constructor(public rests: RestService) {
        super(rests);
    }

    protected getUrl(): string {
        return this.url;
    }
    protected getEntityId(data: any): number {
        var id = 0;
        try {
            id = data.idUsario;
        } catch (ignore) {
            // error parsin id of entity
        }
        if (id === 0) {
            return 0;
        } else {
            return id;
        }

    }
    protected toEntity(data: any): Usuario {
        return EntityParser.parseUsuario(data);
    }

    public iniciarSesion(usuario: Usuario, snackBar: MatSnackBar): boolean {
        let exito: boolean = false;
        lastValueFrom(this.rest.postOne(this.getUrl().concat('/login'), usuario)).then(
            data => {
                try {
                    if (data) {
                        localStorage.setItem('usrnm', JSON.stringify(data));
                        exito = true;
                    }
                } catch (errorp) {
                    console.log('iniciar sesion service error:', errorp);
                }
            }, error => {
                Utils.openSnackBar(error.error.mensaje, 'ok', snackBar);
                //console.log('rest get error', error.error.mensaje);
            }
        ).catch(this.handleErrorLocal);
        return exito;
    }

    private handleErrorLocal(error: any): Promise<Array<any>> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

}