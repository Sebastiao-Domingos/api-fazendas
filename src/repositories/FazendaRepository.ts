import { municipio, proprietario } from "@prisma/client"
import { MunicipioResponse } from "./localizacao/MunicipioRepository"

export type FazendaData = {
    id           :   string       
    codigo       :   string    
    nome         :   string  
    distrito     :   string
    bairro       :   string   
    foto         :  File     
    id_municipio :   string 
    id_proprietario: string
}

export type FazendaResponseData ={
    id           :   string       
    codigo       :   string    
    nome         :   string  
    distrito     :   string
    bairro       :   string   
    foto         :  File     
    id_municipio :   string 
    id_proprietario: string
    municipio? : municipio 
    proprietario? : proprietario
}
export type fazendaDataUpdate = {
    codigo?       :   string    
    nome ?        :   string  
    distrito?     :   string
    bairro ?      :   string   
    foto?         :  File     
    id_municipio? :   string ,
    id_proprietario: string 
}  

export interface FazendaRepository {
    add :( data : FazendaData )=> Promise<FazendaData>,
    find :(fazenda_id : string) => Promise<FazendaResponseData>,
    get :(searchParams : fazendaDataUpdate) => Promise<FazendaData>,
    delete : ( fazenda_id : string ) => Promise<FazendaData>,
    update : (fazenda_id : string, data : fazendaDataUpdate) => Promise<FazendaData>
}