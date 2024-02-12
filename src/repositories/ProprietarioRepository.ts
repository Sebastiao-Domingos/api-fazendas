import { FazendaResponseData } from "./FazendaRepository"
import { MunicipioResponseData } from "./localizacao/MunicipioRepository"

export type ProprietarioData = {
    id     :  string  
    nome    : string   
    nif    :  string  
    distrito : string 
    bairro  : string 
    id_municipio : string
}

export type ProprietarioDataResponseUnique = ProprietarioData &{
    municipio : MunicipioResponseData,
    fazendas : FazendaResponseData[]
}

export type ProprietarioDataUpdade = {
    nome?    : string   
    nif?    :  string  
    distrito? : string 
    bairro?  : string 
    id_municipio? : string
}

export type PaginationData = {
    currentPage : number,
    perPage : number,
    lasPage? : number,
    previous? : number,
}

export type ProprietarioResponseData = {
    proprietarios : ProprietarioData[],
    currentPage : number,
    perPage : number,
    lastPage : number,
    previousPage : number |null,
    total : number
}

export interface ProprietarioRepository {
    add :( data : ProprietarioData )=> Promise<ProprietarioData>,
    find :(admin_id : string) => Promise<ProprietarioDataResponseUnique>,
    findByName :(searchParams : ProprietarioDataUpdade) => Promise<ProprietarioData[]>,
    get: (pagination: PaginationData) => Promise<ProprietarioResponseData>,
    delete : ( admin_id : string ) => Promise<ProprietarioData>,
    update : (admin_id : string, data : ProprietarioDataUpdade) => Promise<ProprietarioData>
}