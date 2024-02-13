import { AdministradorData } from "./AdministradorRepository"
import { FazendaResponseData } from "./FazendaRepository"
import { MunicipioResponseData } from "./localizacao/MunicipioRepository"

export type SessionData = {
    email : string 
    senha : string
}

export type SessionDataResponse = {
    user : Partial<AdministradorData>
    token : string
}

export type SessionDataService = {
    user : Partial<AdministradorData> | null,
    status : "email" | "password" | "okay"
}

export type PayLoadType = {
    id : string,
    nome : string,
    email : string
}
export interface SessionRepository {
    login :( data : SessionData )=> Promise<SessionDataService>,
    logout :() => void,
}