export class Zurlrest {
    public static dominio: string = "http://localhost:9090";

    public static administrador: string = Zurlrest.dominio + '/administrador';
    public static aplicacion: string = Zurlrest.dominio + '/aplicacion';
    public static arealaboral: string = Zurlrest.dominio + '/arealaboral';
    public static candidato: string = Zurlrest.dominio + '/candidato';
    public static competencia_candidato: string = Zurlrest.dominio + '/competenciacandidato';
    public static competencias: string = Zurlrest.dominio + '/competencia';
    public static competencia_vacante: string = Zurlrest.dominio + '/competenciavacante';
    public static contratante: string = Zurlrest.dominio + '/contratante';
    public static usuario: string = Zurlrest.dominio + '/usuario';
    public static vacante: string = Zurlrest.dominio + '/vacante';

}