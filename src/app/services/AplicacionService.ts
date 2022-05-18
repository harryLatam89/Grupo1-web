import { Injectable } from '@angular/core';
import { Aplicacion } from '../models/Aplicacion';
import { EntityParser } from '../utils/entity.parser';
import { AbSerbice } from './abs/abstract.service';
import { RestService } from './abs/rest.service';
import { Zurlrest } from './abs/zurlrest';

@Injectable()
export class AplicacionService extends AbSerbice<Aplicacion> {

    private url: string = Zurlrest.aplicacion;

    constructor(public rests: RestService) {
        super(rests);
    }

    protected getUrl(): string {
        return this.url;
    }
    protected getEntityId(data: any): number {
        var id = 0;
        try {
            id = data.idAplicacion;
        } catch (ignore) {
            // error parsin id of entity
        }
        if (id === 0) {
            return 0;
        } else {
            return id;
        }

    }
    protected toEntity(data: any): Aplicacion {
        return EntityParser.parseAplicacion(data);
    }

}