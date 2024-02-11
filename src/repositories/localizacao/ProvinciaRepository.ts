import { MunicipioResponse } from "./MunicipioRepository"

export type Provincia ={
    id :string
    nome : string
}

export type ProvinciaResponse = {
    id : string
    nome : string,
    numinicios? : MunicipioResponse[]
}


export interface ProvinciaRepository {
    add : ( data : Provincia) => Promise<ProvinciaResponse>;
    update :( data : Provincia) => Promise<ProvinciaResponse>;
    get : () => Promise<ProvinciaResponse[]>;
    find : ( id_provincia :string) => Promise<ProvinciaResponse>;
    findByName : ( nome :string) => Promise<ProvinciaResponse>;
    delete : (id_provincia : string ) => Promise<ProvinciaResponse>
}


