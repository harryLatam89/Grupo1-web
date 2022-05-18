import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class RestService {

    constructor(
        public _http: HttpClient,
    ) {
    }

    getOne(url: string): Observable<any> {
        return this._http.get(url,this.httpOptionsGeneral()).pipe();
    }

    postOne(url: string, entity: any): Observable<any> {
        return this._http.post<any>(url, entity, this.httpOptionsGeneral())
            .pipe(
                /* permite evaluar los codigos de error y dejar vacio el metodo 
                * ayuda a evitar que se genere un error de respuesta
                */
                // capturar error para su utilidad
                //catchError(this.handleError('addUser', user))
            );
        // codigo para recibir respuesta en modo async desde controlador
        // postOne(url,user).subscribe(user => this.usuarios.push(user));
    }

    putOne(url: string, entity: any): Observable<any> {
        return this._http.put<any>(url, entity, this.httpOptionsGeneral())
            .pipe(
                /* permite evaluar los codigos de error y dejar vacio el metodo 
                * ayuda a evitar que se genere un error de respuesta
                */
                // capturar error para su utilidad
                //catchError(this.handleError('addUser', user))
            );
        // codigo para recibir respuesta en modo async desde controlador
        // editarUsuario(url,user).subscribe();
    }

    deleteOne(url: string, id: number): Observable<{}> {
        return this._http.delete(url + '/' + id, this.httpOptionsGeneral())
            .pipe(
                /* permite evaluar los codigos de error y dejar vacio el metodo 
                * ayuda a evitar que se genere un error de respuesta
                */
                // capturar error para su utilidad
                //catchError(this.handleError('add'))
            );
        // codigo para recibir respuesta en modo async desde controlador
        // eliminarUsuario(url,id).subscribe();
    }

    private httpOptionsGeneral() {
        return {
            headers: new HttpHeaders({
                "Access-Control-Allow-Origin": "*",
                //"Access-Control-Allow-Credentials":"true",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS, HEAD",
                //"Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
                //"Content-Type": "application/json",
                //"Accept": "*/*"
                //,Authorization: 'my-auth-token'
            })
        };
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong.
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // Return an observable with a user-facing error message.
        return throwError(
            'Something bad happened; please try again later.');
    }
}