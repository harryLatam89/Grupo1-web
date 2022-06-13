import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { lastValueFrom } from 'rxjs';
import { Candidato } from '../models/Candidato';
import { CompetenciaCandidato } from '../models/CompetenciaCandidato';
import { EntityParser } from '../utils/entity.parser';
import { Utils } from '../utils/utilidades';
import { AbSerbice } from './abs/abstract.service';
import { RestService } from './abs/rest.service';
import { Zurlrest } from './abs/zurlrest';

@Injectable()
export class CompetenciaCandidatoService extends AbSerbice<CompetenciaCandidato> {

    private url: string = Zurlrest.competencia_candidato;

    constructor(public rests: RestService) {
        super(rests);
    }

    protected getUrl(): string {
        return this.url;
    }
    protected getEntityId(data: any): number {
        var id = 0;
        try {
            id = data.IdCompetencia;
        } catch (ignore) {
            // error parsin id of entity
        }
        if (id === 0) {
            return 0;
        } else {
            return id;
        }

    }
    protected toEntity(data: any): CompetenciaCandidato {
        return EntityParser.parseCompetenciaCandidato(data);
    }

    public buscarPorCandidato(candidato: Candidato, snackBar: MatSnackBar, successListener: (list: Array<CompetenciaCandidato>) => void): Array<CompetenciaCandidato> {
        let competenciasEncontradas: Array<CompetenciaCandidato> = [];
        lastValueFrom(this.rest.postOne(this.getUrl().concat('/candidato'), candidato)).then(
            data => {
                try {
                    if (data) {
                        data.forEach((element: CompetenciaCandidato) => {
                            competenciasEncontradas.push(this.toEntity(element));
                        });
                        successListener(competenciasEncontradas);
                    }
                } catch (errorp) {
                    console.log('iniciar sesion service error:', errorp);
                }
            }, error => {
                if (error && error?.status == 400) {
                    //Utils.openSnackBar('No se encontraron competencias registradas', 'ok', snackBar);
                } else {
                    Utils.openSnackBar('Ocurrio un error con el servidor al buscar candidato', 'ok', snackBar);
                }
            }
        ).catch(this.handleErrorLocal);
        return competenciasEncontradas;
    }

    private handleErrorLocal(error: any): Promise<Array<any>> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

}