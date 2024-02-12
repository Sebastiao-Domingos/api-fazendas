import { AdministradorData, AdministradorDataUpdade, AdministradorRepository } from "../repositories/AdministradorRepository";
import { PrismaClient } from "@prisma/client";

const prisma = new  PrismaClient()

export class AdministradorService implements AdministradorRepository {
    
    async add (data: AdministradorData):Promise<AdministradorData>{
        return await prisma.administrador.create({
            data : data,
        }).then( res => res)
        .catch( error => error)
    };

    async get (admin_id: string):Promise<AdministradorData>{
        return await prisma.administrador.findUnique({
            where : {
                id : admin_id
            },
            select : {
                id : true,
                nome : true,
                email : true,
                createAt : true
            }
        }).then( res => res)
        .catch( error => error);
    };
    async getAll () : Promise<AdministradorData[]>{
        return await prisma.administrador.findMany({
            select : {
                email : true, 
                nome : true,
                createAt : true,
                id : true
            }
        })
        .then(res => res)
        .catch(error => error)
    };

    async delete(admin_id: string):Promise<AdministradorData>{
        return prisma.administrador.delete({
            where :{
                id : admin_id
            }
        }).then( res => res)
        .catch( error => error)
    };

    async update(admin_id : string , data: AdministradorDataUpdade): Promise<AdministradorData>{
        return await prisma.administrador.update( {
            data : data,
            where : {
                id :admin_id 
            }
        }).then( res =>res)
        .catch(error => error)
    };
}