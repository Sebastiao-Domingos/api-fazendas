import { Provincia } from "./ProvinciaRepository"

export type MunicipioResponse = {
    id : string,
    nome : string,
    id_provincia : string
}
export type MunicipioResponseData = {
    id : string,
    nome : string,
    id_provincia : string,
    provincia : Provincia
}

export interface MunicipioRepository{
    add : ( data : MunicipioResponse) => Promise<MunicipioResponse>;
    update : (data: MunicipioResponse)=>Promise<MunicipioResponse>;
    get :(id_provincia :string) => Promise<MunicipioResponse[]>;
    find :( id_munnicipio : string) => Promise<MunicipioResponseData>;
    delete : (id_munnicipio : string) => Promise<MunicipioResponse>
} 