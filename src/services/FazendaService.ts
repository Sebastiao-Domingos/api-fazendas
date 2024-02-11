import { PrismaClient } from "@prisma/client";
import { ProprietarioData, ProprietarioDataUpdade, ProprietarioRepository } from "../repositories/ProprietarioRepository";


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

    public async get() : Promise<ProprietarioData[]>{
        return await prisma.proprietario.findMany({
            skip : 1 ,
            take : 20
        })
        .then( res => res)
        .catch( error => error);
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