import { validate } from "uuid";
import { ProvinciaService } from "../../services/localizacao/ProvinciaService";
import {Response ,Request} from "express"

const service = new ProvinciaService();

export class ProvinciaController {
    /**
     * create
     */
    public async create( request :Request , response :Response) {
        const data : any = request.body;

        return await service.add( data).then( res => {
            response.status(201).json(res);
        })
        .catch( error => {
            response.status(401).json(error);
        })
    }

    /**
     * updade
     */
    public async updade( request : Request ,response :Response) {
        const data: {nome : string} = request.body;
        const id = request.params.id!;

        if(validate(id)){
            return await service.update({id :id , nome : data.nome})
            .then( res => {
                response.status(202).json(res);
            })
            .catch( error => {
                response.status(404).json(error);
            });
        }else{
            response.status(400).json("id inválido!")
        }

    }
    /**
     * get
     */
    public async get( request :Request ,response :Response) {
        
        return await service.get()
        .then( res => {
            response.status(200).json({ provincias : res , total: res.length});
        })
        .catch( error => {
            return response.status(400).json(error);
        })
    }

    /**
     * find
     */
    public async find( request : Request ,response :Response) {
        const id_provincia : string = request.params.id;

        if(validate(id_provincia)){
            return await service.find( id_provincia)
            .then( res => {
                if(res){
                    return response.status(200).json(res);
                }else{
                    return response.status(200).json({sms : "Província não encontrada!"})
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
        const {nome} = request.query;
        console.log(nome);
        

        return await service.findByName( String(nome))
        .then( res => {
            if(res){
                return response.status(200).json(res);
            }else{
                return response.status(200).json({sms : "Província não encontrada!"})
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
                    return response.status(204).json({sms : "Província não encontrada"})
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