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



    public getList(): Array<Entity> {
        lastValueFrom(this.rest.getOne(this.getUrl())).then(
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

    getOneById(id: number) {
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

    creteOne(entity: Entity): boolean {
        var exito = false;
        lastValueFrom(this.rest.postOne(this.getUrl(), entity)).then(
            resp => {
                if (resp) {
                    console.log('exitoso');
                    exito = true;
                }
            }
        ).catch(this.handleError);
        return exito;
    }

    editOne(entity: Entity): boolean {
        var exito = false;
        lastValueFrom(this.rest.putOne(this.getUrl() + '/' + this.getEntityId(entity), entity)).then(resp => {
            if (resp) {
                console.log('exitoso');
                exito = true;
            }
        }).catch(this.handleError);
        return exito;
    }

    deleteOne(id: number): boolean {
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