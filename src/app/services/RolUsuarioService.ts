import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { lastValueFrom } from 'rxjs';
import { RolUsuario } from '../models/RolUsuario';
import { Usuario } from '../models/Usuario';
import { EntityParser } from '../utils/entity.parser';
import { Utils } from '../utils/utilidades';
import { AbSerbice } from './abs/abstract.service';
import { RestService } from './abs/rest.service';
import { Zurlrest } from './abs/zurlrest';

@Injectable()
export class RolUsuarioService extends AbSerbice<RolUsuario> {

    private url: string = Zurlrest.rol_usuario;

    constructor(public rests: RestService) {
        super(rests);
    }

    protected getUrl(): string {
        return this.url;
    }
    protected getEntityId(data: any): number {
        var id = 0;
        try {
            id = data.idRol;
        } catch (ignore) {
            // error parsin id of entity
        }
        if (id === 0) {
            return 0;
        } else {
            return id;
        }

    }
    protected toEntity(data: any): RolUsuario {
        return EntityParser.parseRolUsuario(data);
    }

    public cargarRolesDeUsuario(usuario: Usuario, snackBar: MatSnackBar, successListener: (response: Array<RolUsuario>) => void) {
        lastValueFrom(this.rest.postOne(this.getUrl().concat('/usuario'), usuario)).then(
            data => {
                try {
                    if (data) {
                        successListener(data);
                    }
                } catch (errorp) {
                    console.log('buscar roles de usuario:', errorp);
                }
            }, error => {
                if (error && error?.status == 400) {
                    // not found
                } else {
                    Utils.openSnackBar('Ocurrio un error con el servidor', 'ok', snackBar);
                }
            }
        ).catch(this.handleErrorLocal);
    }

    private handleErrorLocal(error: any): Promise<Array<any>> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}