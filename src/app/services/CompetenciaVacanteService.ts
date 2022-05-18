import { Injectable } from '@angular/core';
import { CompetenciaVacante } from '../models/CompetenciaVacante';
import { EntityParser } from '../utils/entity.parser';
import { AbSerbice } from './abs/abstract.service';
import { RestService } from './abs/rest.service';
import { Zurlrest } from './abs/zurlrest';

@Injectable()
export class CompetenciaVacanteService extends AbSerbice<CompetenciaVacante> {

    private url: string = Zurlrest.competencia_vacante;

    constructor(public rests: RestService) {
        super(rests);
    }

    protected getUrl(): string {
        return this.url;
    }
    protected getEntityId(data: any): number {
        var id = 0;
        try {
            id = data.idCompetencia;
        } catch (ignore) {
            // error parsin id of entity
        }
        if (id === 0) {
            return 0;
        } else {
            return id;
        }

    }
    protected toEntity(data: any): CompetenciaVacante {
        return EntityParser.parseCompetenciaVacante(data);
    }

}