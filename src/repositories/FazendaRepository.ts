import { municipio, proprietario } from "@prisma/client"
import { MunicipioResponse, MunicipioResponseData } from "./localizacao/MunicipioRepository"
import { ProprietarioDataResponseUnique } from "./ProprietarioRepository"

export type FazendaData = {
    id           :   string       
    codigo       :   string    
    nome         :   string  
    distrito     :   string
    bairro       :   string   
    fotos         :  Express.Multer.File[]     
    id_municipio :   string 
    id_proprietario: string
}

export type FazendaResponseData ={
    id           :   string       
    codigo       :   string    
    nome         :   string  
    distrito     :   string
    bairro       :   string   
    fotos         :  {path : string}[]      
    id_municipio :   string 
    id_proprietario: string
    municipio? : MunicipioResponseData 
    proprietario? : ProprietarioDataResponseUnique
}
export type FazendaDataUpdate = {
    codigo?       :   string    
    nome ?        :   string  
    distrito?     :   string
    bairro ?      :   string       
    id_municipio? :   string ,
    id_proprietario?: string 
}  

export type SearchDataFazenda= FazendaDataUpdate & {
    currentPage? : number,
    perPage ?: number 
} 

export type FazendaDataResponse = {
    fazendas : FazendaData[],
    currentPage : number,
    perPage : number,
    lastPage :number,
    previousPage : number | null
}

export type DataUpdateImage ={
    path? : string
}

export interface FazendaRepository {
    add :( data : FazendaData )=> Promise<FazendaData>,
    find :(fazenda_id : string) => Promise<FazendaResponseData>,
    get :(searchParams : SearchDataFazenda) => Promise<FazendaDataResponse>,
    delete : ( fazenda_id : string ) => Promise<FazendaData>,
    update : (fazenda_id : string, data : FazendaDataUpdate) => Promise<FazendaData>
    updateImage : (image_id : string, data : DataUpdateImage ) => Promise<FazendaData>
}