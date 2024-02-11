import { validate } from "uuid";
import {Response ,Request} from "express"
import { ProprietarioService } from "../services/ProprietarioService";
import { PaginationData, ProprietarioData, ProprietarioDataUpdade } from "../repositories/ProprietarioRepository";
import { MunicipioService } from "../services/localizacao/MunicipioService";
import { PrismaClient } from "@prisma/client";

const service = new ProprietarioService();
const municipio = new  MunicipioService();
const prisma = new  PrismaClient();
export class ProprietarioController {
    /**
     * create
     */
    public async create( request :Request , response :Response) {
        const data : ProprietarioData = request.body;

        if(validate(data.id_municipio)){
            await municipio.find( data.id_municipio)
            .then( async (res) => {
                if(res){
                    await service.findByName({nif : data.nif , nome : data.nome})
                    .then( async(respon) => {
                        console.log(respon);
                        
                        if(!respon.length){
                            return await service.add( data).then( res => {
                                response.status(201).json(res);
                            })
                            .catch( error => {
                                response.status(401).json(error);
                            })
                        }else{
                            return response.status(400).json( {sms : "ja existe proprietario com este nome ou nif"})
                        }
                    })
                    .catch( () =>{
                        return response.status(400).json( {sms : "erro ao validar o nome e nif"})
                    })
                }else {
                    return response.status(400).json( {sms : "id do municipio não encontrada!"})
                }
            })
            .catch( error => {
                return response.status(400).json( {sms : "Erro a procurar o municipio"})
            })
        }else {
            return response.status(400).json( {sms : "id do municipio inválido!"})
        }
    }

    /**
     * updade
     */
    public async updade( request : Request ,response :Response) {
        const data:ProprietarioDataUpdade = request.body;
        const id = request.params.id!;

        if(validate(id)){
            await service.find(id)
            .then( async( res) => {
                if(res){
                    return await service.update( id , data)
                    .then( res => {
                        response.status(202).json(res);
                    })
                    .catch( error => {
                        response.status(404).json(error);
                    });
                }else {
                    response.status(400).json("Usuário não identificado!")
                }
            })
            .catch( () => {
                response.status(400).json("Falha a verificar o Usuário!")
            })
        }else{
            response.status(400).json("id inválido!")
        }
    }
    /**
     * get
     */
    public async get( request :Request ,response :Response) {
        const {currentPage= 1 , perPage =5}:Partial<PaginationData >= request.query;
        
        return await service.get({currentPage : Number(currentPage ),perPage  : Number(perPage)})
        .then( res => {
            response.status(200).json(res);
        })
        .catch( error => {
            return response.status(400).json(error);
        })
    }

    /**
     * find
     */
    public async find( request : Request ,response :Response) {
        const id_proprietario : string = request.params.id;

        if(validate(id_proprietario)){
            return await service.find( id_proprietario)
            .then( res => {
                if(res){
                    return response.status(200).json(res);
                }else{
                    return response.status(200).json({sms : "Proprietario não encontrada!"})
                }
            })
            .catch( error => {
                return response.status(400).json(error);
            })
        }else{
            response.status(400).json({sms : "id inválido!"})
        }
    }
     /**
     * find by name
     */
     public async findByName( request : Request ,response :Response) {
        const data : ProprietarioDataUpdade = request.query;

        return await service.findByName(data)
        .then( res => {
            if(res){
                return response.status(200).json(res);
            }else{
                return response.status(200).json({sms : "Proprietario não encontrada!"})
            }
        })
        .catch( error => {
            return response.status(400).json(error);
        })
    }

    /**
     * delete
     */
    public async delete( request : Request , response : Response) {
        const id_provincia : string = request.params.id;

        if(validate(id_provincia)){
            return await service.delete( id_provincia)
            .then( res => {
                if( res ){
                    return response.status(204).json( res)
                }else {
                    return response.status(204).json({sms : "Proprietario não encontrada"})
                }
            })
            .catch( error => {
                return response.status(404).json( error);
            })
        }else {
            response.status(400).json({sms : "id inválido!"})
        }
     }
}