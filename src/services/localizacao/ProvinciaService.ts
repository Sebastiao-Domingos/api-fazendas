import { PrismaClient } from "@prisma/client";
import { Provincia, ProvinciaRepository, ProvinciaResponse } from "../../repositories/localizacao/ProvinciaRepository";


const prisma = new PrismaClient();



export class ProvinciaService implements ProvinciaRepository{

    public async add(data: Provincia): Promise<ProvinciaResponse>{

        return await prisma.provincia.create( {
            data : data
        }).then( res => res)
        .catch( error => error);
    };

    public async update(data: Provincia) : Promise<ProvinciaResponse>{
        return await prisma.provincia.update({
            data :{ nome : data.nome},
            where : {
                id : data.id
            }
        }).then( res => res)
        .catch( error => error)
    };

    public async findByName (nome: string):Promise<ProvinciaResponse>{
        
        return await prisma.provincia.findUnique( {
            where : {
                nome : nome
            },
            include : {
                municipio : true
            }
        }).then( res => res)
        .catch( error => error);
    };

    public async get() : Promise<ProvinciaResponse[]>{
        return await prisma.provincia.findMany({
            skip : 1 ,
            take : 20
        })
        .then( res => res)
        .catch( error => error);
    };
    public async find(id_provincia: string) : Promise<ProvinciaResponse>{
        return await prisma.provincia.findUnique( {
            where : {
                id : id_provincia
            },
            include : {
                municipio : true
            }
        }).then( res => res)
        .catch( error=> error);
    };

    public async delete(id_provincia: string) : Promise<ProvinciaResponse>{
        return await prisma.provincia.delete( {
            where : {
                id : id_provincia
            }
        }).then( res => res)
        .catch( error => error)
    };
}