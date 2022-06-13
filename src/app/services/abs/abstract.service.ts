import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { lastValueFrom } from 'rxjs';

@Injectable()
export abstract class AbSerbice<Entity> {


    /*
    * clase generica para utilizacion de servicios rest
    * <Entity> es el objeto generico que permite utilizar esta clase 
    * para abstraer varias veces los metodos, adaptando lo basico  
     */
    private list: Array<Entity> = [];
    private one: any;
    constructor(
        public rest: RestService
    ) {
    }

    /*
    * Metodos Abstractos que permiten utilizar datos desde las clases que lo extienden
    */
    protected abstract getUrl(): string;
    protected abstract getEntityId(data: any): number;
    protected abstract toEntity(data: any): Entity;



    public getList(successListener: (response: Array<Entity>) => void): Array<Entity> {
        this.list = [];
        lastValueFrom(this.rest.getOne(this.getUrl().concat('/lista'))).then(
            data => {
                try {
                    if (data) {
                        /*
                         * El siguiente codigo permite hacer un parseo de forma manual
                         * desde la respuesta a la clase generica
                         * para evitar errores comunes a la hora de recivir JSON 
                         */
                        data.forEach((element: Entity) => {
                            this.list.push(this.toEntity(element));
                        });
                        successListener(this.list);
                    }
                } catch (errorp) {
                    console.log('rest parse error:', errorp)
                }
            }, error => {
                console.log('rest get error', error);
            }
        ).catch(this.handleError);
        return this.list;
    }

    getOneById(id: number, successListener: (response: Entity) => void): Entity {
        let urld = this.getUrl() + '/' + id;
        lastValueFrom(this.rest.getOne(urld)).then(
            data => {
                try {
                    if (data) {
                        /*
                         * El siguiente codigo permite hacer un parseo de forma manual
                         * desde la respuesta a la clase generica
                         * para evitar errores comunes a la hora de recivir JSON 
                         */
                        this.one = this.toEntity(data);
                        successListener(this.one);
                    }
                } catch (errorp) {
                    console.log('rest parse error:', errorp)
                }
            }, error => {
                console.log('rest get error', error);
            }
        ).catch(this.handleError);
        return this.one;
    }

    creteOne(entity: Entity, successListener: (response: Entity) => void): boolean {
        var exito = false;
        lastValueFrom(this.rest.postOne(this.getUrl(), entity)).then(
            resp => {
                if (resp) {
                    console.log('exitoso');
                    exito = true;
                    successListener(this.toEntity(resp));
                }
            }
        ).catch(this.handleError);
        return exito;
    }

    editOne(entity: Entity, successListener: (response: boolean) => void): boolean {
        var exito = false;
        lastValueFrom(this.rest.putOne(this.getUrl() + '/' + this.getEntityId(entity), entity)).then(resp => {
            if (resp) {
                console.log('exitoso');
                exito = true;
                successListener(exito);
            }
        }).catch(this.handleError);
        return exito;
    }

    deleteOne(id: number, successListener: () => void): boolean {
        var exito = false;
        lastValueFrom(this.rest.deleteOne(this.getUrl(), id)).then(entity => {
            try {
                if (entity) {
                    console.log('rest delete error');
                }
            } catch (errorp) {
                console.log('rest parse error:', errorp)
            }
        },
            error => {
                console.log('rest delete error', error);
            }
        ).catch(this.handleError);
        return exito;
    }

    private handleError(error: any): Promise<Array<any>> {
        console.error('An error occurred dur rest ', error);
        return Promise.reject(error.message || error);
    }


}