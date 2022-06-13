import { Administrador } from "../models/Administrador";
import { Aplicacion } from "../models/Aplicacion";
import { AreaLaboral } from "../models/AreaLaboral";
import { Candidato } from "../models/Candidato";
import { CompetenciaCandidato } from "../models/CompetenciaCandidato";
import { Competencias } from "../models/Competencias";
import { CompetenciaVacante } from "../models/CompetenciaVacante";
import { Contratante } from "../models/Contratante";
import { Rol } from "../models/Rol";
import { RolUsuario } from "../models/RolUsuario";
import { Usuario } from "../models/Usuario";
import { Vacantes } from "../models/Vacantes";

export class EntityParser {

    public static parseAdministrador(data: any): Administrador {
        return new Administrador(
            data.idAdministrador,
            this.parseUsuario(data.usuario),
            data.fechaExpiracion,
        );
    }

    public static parseAplicacion(data: any): Aplicacion {
        return new Aplicacion(
            data.idAplicacion,
            this.parseCandidato(data.candidato),
            this.parseVacante(data.vacante),
        );
    }

    public static parseAreaLaboral(data: any): AreaLaboral {
        return new AreaLaboral(
            data.idArea,
            data.nombreArea,
        );
    }

    public static parseCandidato(data: any): Candidato {
        return new Candidato(
            data.idCandidato,
            this.parseUsuario(data.usuario),
            this.parseAreaLaboral(data.areaLaboral),
            data.laborando,
        );
    }

    public static parseCompetenciaCandidato(data: any): CompetenciaCandidato {
        return new CompetenciaCandidato(
            data.idCompetencia,
            this.parseCandidato(data.candidato),
            this.parseCompetencias(data.competencia),
        );
    }

    public static parseCompetencias(data: any): Competencias {
        return new Competencias(
            data.idCompetencia,
            this.parseAreaLaboral(data.areaLaboral),
            data.nombreCompetencia
        );
    }

    public static parseCompetenciaVacante(data: any): CompetenciaVacante {
        return new CompetenciaVacante(
            data.idCompetencia,
            this.parseVacante(data.vacante),
            this.parseCompetencias(data.competencia),
        );
    }

    public static parseContratante(data: any): Contratante {
        return new Contratante(
            data.idContratante,
            this.parseUsuario(data.usuario),
            data.areaAsignada,
        );
    }

    public static parseUsuario(data: any): Usuario {
        return new Usuario(
            data.idUsario,
            data.nombre,
            data.apellido,
            data.userName,
            data.userPass,
            data.codigoDocumento,
            data.tipoDocumento,
            data.fechaCreacion,
            data.correo,
            data.telefono,
            data.activo,
        );
    }

    public static parseVacante(data: any): Vacantes {
        return new Vacantes(
            data.idVacante,
            this.parseContratante(data.contratante),
            data.nombreVacante,
            data.descripcion,
            data.estado,
            data.activo,
        );
    }

    public static parseRol(data: any): Rol {
        return new Rol(
            data.idRol,
            data.nombre
        );
    }

    public static parseRolUsuario(data: any): RolUsuario {
        return new RolUsuario(
            data.idRol,
            this.parseUsuario(data.usuario),
            this.parseRol(data.rol)
        );
    }
}