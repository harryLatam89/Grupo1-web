import { Injectable } from '@angular/core';
import { CompetenciaCandidato } from '../models/CompetenciaCandidato';
import { EntityParser } from '../utils/entity.parser';
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

}