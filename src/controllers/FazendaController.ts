

import { validate } from "uuid";
import {Response ,Request} from "express"
import { FazendaService } from "../services/FazendaService";
import { PaginationData, ProprietarioData, ProprietarioDataUpdade } from "../repositories/ProprietarioRepository";
import { MunicipioService } from "../services/localizacao/MunicipioService";
import { PrismaClient } from "@prisma/client";
import { ProprietarioService } from "../services/ProprietarioService";
import { FazendaData, FazendaDataUpdate, SearchDataFazenda } from "../repositories/FazendaRepository";

const service = new FazendaService();
const municipio = new  MunicipioService();
const proprietario = new ProprietarioService();
const prisma = new  PrismaClient();
export class FazendaController {
    /**
     * create
     */
    public async create( request :Request , response :Response) {
        const data : FazendaData = request.body;

        if(validate(data.id_municipio) && validate(data.id_proprietario)){
            await municipio.find( data.id_municipio)
            .then( async (res) => {
                if(res){
                    await proprietario.find(data.id_proprietario)
                    .then( async (resp )=> {
                        if( resp ){
                            await service.add(data)
                            .then( respon => {
                                return response.status(201).json(respon);
                            })
                            .catch( error => {
                                return response.status(401).json(error);
                            })
                        }else {
                            return response.status(400).json( {sms : "proprietario não foi encontrado!"})
                        }
                    })
                }else {
                    return response.status(400).json( {sms : "municipio não foi encontrada!"})
                }
            })
            .catch( error => {
                return response.status(400).json( {sms : "Erro a procurar o municipio"})
            })
        }else {
            return response.status(400).json( {sms : "id do municipio inválido ou id do proprietario!"})
        }
    }

    /**
     * updade
     */
    public async updade( request : Request ,response :Response) {
        const data:FazendaDataUpdate = request.body;
        const id = request.params.id!;

        if(validate(id)){
            await service.find(id)
            .then( async( res) => {
                if(res){
                    if(data.id_municipio){
                        if(validate(data.id_municipio)){
                            await municipio.find(data.id_municipio)
                            .then( async (resMunicipio) => {
                                if( resMunicipio){
                                    return await service.update( id , data)
                                    .then( res => {
                                        response.status(202).json(res);
                                    })
                                    .catch( error => {
                                        response.status(404).json(error);
                                    });
                                }else{
                                    return response.status(400).json({sms : "município não foi encontrado!"})
                                }
                            })
                            .catch( error => error)
                        }else{
                            response.status(400).json({sms : "id do município inváliddo"})
                        }
                    }else if( data.id_proprietario){
                        if(validate(data.id_proprietario)){
                            await proprietario.find(data.id_proprietario)
                            .then( async (resProprietario) => {
                                if( resProprietario){
                                    return await service.update( id , data)
                                    .then( res => {
                                        response.status(202).json(res);
                                    })
                                    .catch( error => {
                                        response.status(404).json(error);
                                    });
                                }else{
                                    return response.status(400).json({sms : "Proprietário não foi encontrado!"})
                                }
                            })
                            .catch( error => error)
                        }else {
                            response.status(400).json({sms : "id do proprietario inváliddo"})
                        }
                    }else {
                        return await service.update( id , data)
                        .then( res => {
                            response.status(202).json(res);
                        })
                        .catch( error => {
                            response.status(404).json(error);
                        });
                    }
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
        const {currentPage= 1 , perPage =10 , bairro ,distrito ,id_municipio ,id_proprietario}:Partial<SearchDataFazenda>= request.query;
        
        return await service.get({currentPage : Number(currentPage ),perPage  : Number(perPage) , bairro , distrito , id_municipio , id_proprietario})
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
        const id_fazenda : string = request.params.id;

        if(validate(id_fazenda)){
            return await service.find( id_fazenda)
            .then( res => {
                if(res){
                    return response.status(200).json(res);
                }else{
                    return response.status(200).json({sms : "Fazenda não encontrada!"})
                }
            })
            .catch( error => {
                return response.status(400).json(error);
            })
        }else{
            response.status(400).json({sms : "id inválido!"})
        }
    }
    //  /**
    //  * find by name
    //  */
    //  public async findByName( request : Request ,response :Response) {
    //     const data : ProprietarioDataUpdade = request.query;

    //     return await service.findByName(data)
    //     .then( res => {
    //         if(res){
    //             return response.status(200).json(res);
    //         }else{
    //             return response.status(200).json({sms : "Proprietario não encontrada!"})
    //         }
    //     })
    //     .catch( error => {
    //         return response.status(400).json(error);
    //     })
    // }

    /**
     * delete
     */
    public async delete( request : Request , response : Response) {
        const id_fazenda : string = request.params.id;

        if(validate(id_fazenda)){
            return await service.delete( id_fazenda)
            .then( res => {
                if( res ){
                    return response.status(204).json( res)
                }else {
                    return response.status(204).json({sms : "Fazenda não encontrada"})
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