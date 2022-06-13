import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { Candidato } from '../models/Candidato';
import { Contratante } from '../models/Contratante';
import { Usuario } from '../models/Usuario';
import { Vacantes } from '../models/Vacantes';
import { EntityParser } from '../utils/entity.parser';
import { Utils } from '../utils/utilidades';
import { AbSerbice } from './abs/abstract.service';
import { RestService } from './abs/rest.service';
import { Zurlrest } from './abs/zurlrest';

@Injectable()
export class VacanteService extends AbSerbice<Vacantes> {

    private url: string = Zurlrest.vacante;

    constructor(public rests: RestService) {
        super(rests);
    }

    protected getUrl(): string {
        return this.url;
    }
    protected getEntityId(data: any): number {
        var id = 0;
        try {
            id = data.idVacante;
        } catch (ignore) {
            // error parsin id of entity
        }
        if (id === 0) {
            return 0;
        } else {
            return id;
        }
    }
    protected toEntity(data: any): Vacantes {
        return EntityParser.parseVacante(data);
    }

    public listaVacantesDeContratante(contratante: Contratante, snackBar: MatSnackBar, successListener: (list: Array<Vacantes>) => void) {
        firstValueFrom(this.rest.postOne(this.getUrl().concat('/contratante'), contratante)).then(
            data => {
                try {
                    if (data) {
                        let vacantesEncontradas: Array<Vacantes> = [];
                        data.forEach((element: Vacantes) => {
                            if (element?.idVacante > 0) vacantesEncontradas.push(element);
                        });
                        successListener(vacantesEncontradas);
                    }
                } catch (errorp) {
                    console.log('Error al buscar vacantes del usuario:', errorp);
                }
            }, error => {
                if (error && error?.status == 400) {
                    //Utils.openSnackBar('No se encontraron competencias registradas', 'ok', snackBar);
                } else {
                    Utils.openSnackBar('Ocurrio un error con el servidor al buscar vacantes', 'ok', snackBar);
                }
            }
        ).catch(this.handleErrorLocal);
    }

    public listaVacantesDeCandidato(candidato: Candidato, snackBar: MatSnackBar, successListener: (list: Array<Vacantes>) => void) {
        firstValueFrom(this.rest.postOne(this.getUrl().concat('/candidato'), candidato)).then(
            data => {
                try {
                    if (data) {
                        let vacantesEncontradas: Array<Vacantes> = [];
                        data.forEach((element: Vacantes) => {
                            if (element?.idVacante > 0) vacantesEncontradas.push(element);
                        });
                        successListener(vacantesEncontradas);
                    }
                } catch (errorp) {
                    console.log('Error al buscar vacantes del usuario:', errorp);
                }
            }, error => {
                if (error && error?.status == 400) {
                    //Utils.openSnackBar('No se encontraron competencias registradas', 'ok', snackBar);
                } else {
                    Utils.openSnackBar('Ocurrio un error con el servidor al buscar vacantes', 'ok', snackBar);
                }
            }
        ).catch(this.handleErrorLocal);
    }

    public listaVacantesDeContratanteDesactivados(contratante: Contratante, snackBar: MatSnackBar, successListener: (list: Array<Vacantes>) => void) {
        firstValueFrom(this.rest.postOne(this.getUrl().concat('/contratante/desactivado'), contratante)).then(
            data => {
                try {
                    if (data) {
                        let vacantesEncontradas: Array<Vacantes> = [];
                        data.forEach((element: Vacantes) => {
                            if (element?.idVacante > 0) vacantesEncontradas.push(element);
                        });
                        successListener(vacantesEncontradas);
                    }
                } catch (errorp) {
                    console.log('Error al buscar vacantes del usuario:', errorp);
                }
            }, error => {
                if (error && error?.status == 400) {
                    //Utils.openSnackBar('No se encontraron competencias registradas', 'ok', snackBar);
                } else {
                    Utils.openSnackBar('Ocurrio un error con el servidor al buscar vacantes', 'ok', snackBar);
                }
            }
        ).catch(this.handleErrorLocal);
    }

    public listaVacantesDeContratanteOcupados(contratante: Contratante, snackBar: MatSnackBar, successListener: (list: Array<Vacantes>) => void) {
        firstValueFrom(this.rest.postOne(this.getUrl().concat('/contratante/ocupado'), contratante)).then(
            data => {
                try {
                    if (data) {
                        let vacantesEncontradas: Array<Vacantes> = [];
                        data.forEach((element: Vacantes) => {
                            if (element?.idVacante > 0) vacantesEncontradas.push(element);
                        });
                        successListener(vacantesEncontradas);
                    }
                } catch (errorp) {
                    console.log('Error al buscar vacantes del usuario:', errorp);
                }
            }, error => {
                if (error && error?.status == 400) {
                    //Utils.openSnackBar('No se encontraron competencias registradas', 'ok', snackBar);
                } else {
                    Utils.openSnackBar('Ocurrio un error con el servidor al buscar vacantes', 'ok', snackBar);
                }
            }
        ).catch(this.handleErrorLocal);
    }

    private handleErrorLocal(error: any): Promise<Array<any>> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

}