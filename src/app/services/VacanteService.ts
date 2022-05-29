import { Injectable } from '@angular/core';
import { Vacantes } from '../models/Vacantes';
import { EntityParser } from '../utils/entity.parser';
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

}