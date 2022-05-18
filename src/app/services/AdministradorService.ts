import { Injectable } from '@angular/core';
import { Administrador } from '../models/Administrador';
import { EntityParser } from '../utils/entity.parser';
import { AbSerbice } from './abs/abstract.service';
import { RestService } from './abs/rest.service';
import { Zurlrest } from './abs/zurlrest';
@Injectable()
export class AdministradorService extends AbSerbice<Administrador> {

    private url: string = Zurlrest.administrador;

    constructor(public rests: RestService) {
        super(rests);
    }

    protected getUrl(): string {
        return this.url;
    }
    protected getEntityId(data: any): number {
        var id = 0;
        try {
            id = data.idAdministrador;
        } catch (ignore) {
            // error parsin id of entity
        }
        if (id === 0) {
            return 0;
        } else {
            return id;
        }

    }
    protected toEntity(data: any): Administrador {
        return EntityParser.parseAdministrador(data);
    }

}