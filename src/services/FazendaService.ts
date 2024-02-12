import { PrismaClient } from "@prisma/client";
import { ProprietarioData, ProprietarioDataUpdade, ProprietarioRepository } from "../repositories/ProprietarioRepository";
import { FazendaData, FazendaDataResponse, FazendaDataUpdate, FazendaRepository, FazendaResponseData, SearchDataFazenda } from "../repositories/FazendaRepository";


const prisma = new PrismaClient();



export class FazendaService implements FazendaRepository{
    public async add (data: any) :Promise<FazendaData>{
        return await prisma.fazenda.create( { 
            data : data
        })
        .then( response => response)
        .catch( error => error);
    };
    public async find (fazenda_id: string): Promise<FazendaResponseData>{
        return await prisma.fazenda.findUnique({
            where : {
                id : fazenda_id
            },
            include : {
                municipio : {
                    include : {
                        provincia : true
                    }
                },
                proprietario : {
                    include : {
                        municipio : {
                            include : {
                                provincia : true
                            }
                        }
                    }
                }
            }
        }).then( response => response)
        .catch( error => error);
    };

    public async get (searchParams: SearchDataFazenda) : Promise<FazendaDataResponse>{
        const counterFazenda = await prisma.fazenda.count();
        if(counterFazenda){
            const lastPage = Math.ceil( counterFazenda/searchParams.perPage!);
            const jump = (searchParams.currentPage! -1)*searchParams.perPage!;
            const previousPage = (searchParams.currentPage!-1 >=1) ? searchParams.currentPage!-1 : null;

            return await prisma.fazenda.findMany({
                skip : jump,
                take : searchParams.perPage!,
                where : {
                    bairro : searchParams.bairro,
                    distrito : searchParams.distrito,
                    id_municipio : searchParams.id_municipio,
                    id_proprietario : searchParams.id_proprietario
                }
            }).then( response => {
                return {
                    fazendas: response,
                    currentPage: searchParams.currentPage,
                    perPage: searchParams.perPage,
                    lastPage: lastPage,
                    previousPage: previousPage
                }
            })
            .catch( error => error);
            
        }else {
            return {
                fazendas: [],
                currentPage: 0,
                perPage: 0,
                lastPage: 0,
                previousPage:null
            }
        }
    };
    public async delete (fazenda_id: string) : Promise<FazendaData>{
        return await prisma.fazenda.delete( {
            where : {
                id : fazenda_id
            }
        })
        .then ( response => response)
        .catch( error => error);
    };

    public async update (fazenda_id: string, data: any): Promise<FazendaData>{

        return await prisma.fazenda.update( {
            data : data,
            where : {
                id : fazenda_id
            }
        }).then( response => response)
        .catch( error => error);
    };

}