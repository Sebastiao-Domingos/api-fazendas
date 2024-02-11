import { PrismaClient } from "@prisma/client";
import { MunicipioRepository, MunicipioResponse, MunicipioResponseData } from "../../repositories/localizacao/MunicipioRepository";

const prisma = new PrismaClient();

export class MunicipioService implements MunicipioRepository{
    public async add (data: MunicipioResponse) : Promise<MunicipioResponse>{
        
        return await prisma.municipio.create({
            data : data
        })
        .then( res => res)
        .catch( error => error);
    };
    public async update(data: MunicipioResponse) : Promise<MunicipioResponse>{
        
        return await prisma.municipio.update( {
            data : {nome : data.nome , id_provincia : data.id_provincia},
            where : {
                id : data.id
            }
        }).then( res => res)
        .catch( error => error);
    };

    public async get(id_provincia?:string) : Promise<MunicipioResponse[]>{
        return await prisma.municipio.findMany( {
            where : {
                id_provincia : id_provincia
            }
        })
        .then( res => res)
        .catch( error => error);
    };
    public async find(id_munnicipio :string) : Promise<MunicipioResponseData>{

        return await prisma.municipio.findUnique({ where : { id : id_munnicipio} , include : {provincia : true}})
        .then( res => res)
        .catch( error => error);
    };
    public async delete(id_munnicipio :string) : Promise<MunicipioResponse>{

        return await prisma.municipio.delete( { where : { id : id_munnicipio}})
        .then( res => res)
        .catch( error => error);
    };

}