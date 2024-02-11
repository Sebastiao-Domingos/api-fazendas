import { Request, Response } from "express";
import { MunicipioService } from "../../services/localizacao/MunicipioService";
import { MunicipioResponse } from "../../repositories/localizacao/MunicipioRepository";
import { ProvinciaService } from "../../services/localizacao/ProvinciaService";
import { validate } from "uuid";


const service = new MunicipioService();
const provincia = new ProvinciaService();

export class MunicipioController {

    /**
     * create
     */
    public async create( request: Request , response : Response) {
        const data : MunicipioResponse = request.body;
        
        await provincia.find(data.id_provincia).then( async (res) => {
            if( res ){
                return await service.add(data).then( res =>{
                    return response.status(202).json(res);
                })
                .catch( error => {
                    return response.status(401).json(error);
                })
            }else {
                response.status(400).json( {sms : "id da província inválida!"})
            }
        }).catch( error => {
            response.status(400).json({sms : "Erro ao veificar a provincia!" , erro : error})
        });
    }

    /**
     * update
     */
    public async update(request : Request , response : Response) {
        const id_municipio : string = request.params.id;
        const data : { nome : string , id_provincia : string } = request.body;

        if(validate(id_municipio)){
            await provincia.find(data.id_provincia)
            .then( async ( res) => {
                if( res ){
                    await service.update({...data , id : id_municipio})
                    .then( res =>{
                        return response.status(201).json(res);
                    })
                    .catch( error=> {
                        return response.status(401).json(error)
                    })
                }else{
                    response.status(401).json({sms : "id da provincia não encontrada!"})
                }
            })
            .catch( error => {
                response.status(400).json({sms : "Erro ao veificar a provincia!" , erro : error})
            });
        }else {
            response.status(400).json({sms : "id do municipio inválido"})
        }
    }

    /**
     * get
     */
    public async get(request : Request , response : Response) {
        const {id} : Partial<{id : string}>= request.query;
        return await service.get(id)
        .then( res => {
            return response.status(200).json({ municipios : res , total : res.length});
        })
        .catch( error =>{
            return response.status(400).json(error);
        })
    }

    /** 
     * find
     */
    public async find( request : Request , response :Response) {
        const id_municipio : string = request.params.id;

        if(validate(id_municipio)){
            return await service.find(id_municipio)
            .then( res => {
                return response.status(200).json(res);
            })
            .catch( error => {
                return response.status(400).json(error);
            } )
        }else{
            return response.status(400).json({sms : "id do municipio inválido"})
        }
    }

    /**
     * delete
     */
    public async delete( request : Request , response : Response) {
        const id_municipio : string = request.params.id;

        if( validate(id_municipio)){
            return await service.delete(id_municipio)
            .then( res => {
                return response.status(200).json(res);
            })
            .catch( error => {
                return response.status(400).json(error);
            })
        }else {
            return response.status(400).json({sms : "id do municipio inválido"})
        }
    }
}