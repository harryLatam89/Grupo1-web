import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { lastValueFrom } from 'rxjs';
import { Contratante } from '../models/Contratante';
import { Usuario } from '../models/Usuario';
import { EntityParser } from '../utils/entity.parser';
import { Utils } from '../utils/utilidades';
import { AbSerbice } from './abs/abstract.service';
import { RestService } from './abs/rest.service';
import { Zurlrest } from './abs/zurlrest';

@Injectable()
export class ContratanteService extends AbSerbice<Contratante> {

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
            id = data.idContratante;
        } catch (ignore) {
            // error parsin id of entity
        }
        if (id === 0) {
            return 0;
        } else {
            return id;
        }

    }
    protected toEntity(data: any): Contratante {
        return EntityParser.parseContratante(data);
    }

    public buscarContratantePorUsuario(usuario: Usuario, snackBar: MatSnackBar, successListener: (response: Contratante) => void): void {
        lastValueFrom(this.rest.postOne(this.getUrl().concat('/usuario'), usuario)).then(
            data => {
                try {
                    if (data) {
                        localStorage.setItem('usrnm', JSON.stringify(data));
                        successListener(data);
                    }
                } catch (errorp) {
                    console.log('El contratante presenta problemas:', errorp);
                }
            }, error => {
                if (error && error?.status == 400) {
                    Utils.openSnackBar('Contratante no encontrado', 'ok', snackBar);
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