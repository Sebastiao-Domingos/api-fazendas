import { PrismaClient } from "@prisma/client";
import { PaginationData, ProprietarioData, ProprietarioDataUpdade, ProprietarioRepository, ProprietarioResponseData } from "../repositories/ProprietarioRepository";


const prisma = new PrismaClient();



export class ProprietarioService implements ProprietarioRepository{

    public async add(data: ProprietarioData): Promise<ProprietarioData>{

        return await prisma.proprietario.create( {
            data : data
        }).then( res => res)
        .catch( error => error);
    };

    public async update( id_proprietario : string, data: ProprietarioDataUpdade) : Promise<ProprietarioData>{
        return await prisma.proprietario.update({
            data :data,
            where : {
                id : id_proprietario
            }
        }).then( res => res)
        .catch( error => error)
    };

    public async findByName( searchParams : ProprietarioDataUpdade):Promise<ProprietarioData[]>{
        
        return await prisma.proprietario.findMany( {
            where : {
                nome : searchParams.nome,
                nif :searchParams.nif,
                bairro : searchParams.bairro,
                distrito : searchParams.distrito
            },
            include : {
                fazenda : true
            }
        }).then( res => res)
        .catch( error => error);
    };

    public async get(pagination : Partial<PaginationData>) : Promise<ProprietarioResponseData>{

        const countElements = await prisma.proprietario.count();
    
        if( countElements ){
            pagination.lasPage = Math.ceil(countElements/pagination.perPage!)
            const previous = (pagination.currentPage!-1) >= 1 ? pagination.currentPage!-1 : null; 
            const jump  : number = pagination.currentPage!*pagination.perPage! - pagination.perPage!;

            return await prisma.proprietario.findMany({
                skip : jump,
                take : pagination.perPage
            })
            .then( res => {
                return {
                    proprietarios: res,
                    currentPage: pagination.currentPage,
                    perPage: pagination.perPage,
                    lastPage: pagination.lasPage,
                    previousPage : previous,
                    total: countElements,
                }
            })
            .catch( error => error);
        }else {
            return  {
                proprietarios: [],
                currentPage: 0,
                perPage: 0,
                lastPage: 0,
                previousPage : 0,
                total: 0,
            }
        }
    };
    public async find(id_proprietario: string) : Promise<ProprietarioData>{
        return await prisma.proprietario.findUnique( {
            where : {
                id : id_proprietario
            },
            include : {
                fazenda : true
            }
        }).then( res => res)
        .catch( error=> error);
    };

    public async delete(id_proprietario: string) : Promise<ProprietarioData>{
        return await prisma.proprietario.delete( {
            where : {
                id : id_proprietario
            }
        }).then( res => res)
        .catch( error => error)
    };
}