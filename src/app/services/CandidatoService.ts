import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { lastValueFrom } from 'rxjs';
import { Candidato } from '../models/Candidato';
import { Usuario } from '../models/Usuario';
import { EntityParser } from '../utils/entity.parser';
import { Utils } from '../utils/utilidades';
import { AbSerbice } from './abs/abstract.service';
import { RestService } from './abs/rest.service';
import { Zurlrest } from './abs/zurlrest';

@Injectable()
export class CandidatoService extends AbSerbice<Candidato> {

    private url: string = Zurlrest.candidato;

    constructor(public rests: RestService) {
        super(rests);
    }

    protected getUrl(): string {
        return this.url;
    }
    protected getEntityId(data: any): number {
        var id = 0;
        try {
            id = data.idCandidato;
        } catch (ignore) {
            // error parsin id of entity
        }
        if (id === 0) {
            return 0;
        } else {
            return id;
        }

    }
    protected toEntity(data: any): Candidato {
        return EntityParser.parseCandidato(data);
    }

    public buscarPorUsuario(usuario: Usuario, snackBar: MatSnackBar, successListener: (candidatoFound:Candidato) => void): Candidato {
        let candidatoEncontrado: Candidato = Utils.candodatoVacio();
        lastValueFrom(this.rest.postOne(this.getUrl().concat('/usuario'), usuario)).then(
            data => {
                try {
                    if (data) {
                        candidatoEncontrado = this.toEntity(data);
                        successListener(candidatoEncontrado);
                    }
                } catch (errorp) {
                    console.log('iniciar sesion service error:', errorp);
                }
            }, error => {
                Utils.openSnackBar('Ocurrio un error con el servidor al buscar candidato', 'ok', snackBar);
                //console.log('rest get error', error);
            }
        ).catch(this.handleErrorLocal);
        return candidatoEncontrado;
    }

    private handleErrorLocal(error: any): Promise<Array<any>> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

}

