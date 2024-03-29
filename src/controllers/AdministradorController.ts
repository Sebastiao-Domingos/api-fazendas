import { validate } from "uuid";
import { AdministradorData, AdministradorDataUpdade } from "../repositories/AdministradorRepository";
import { AdministradorService } from "../services/AdministradorService";
import { Request, Response } from 'express';



const service = new AdministradorService();
export class AdministradorController{

    /**
     * create
     */
    public async create( request : Request , response : Response ) {
        const data :any = request.body;
        await service.add( data).then( res => {
            return response.status(201).json(res);
        })
        .catch( error => {
            return response.status(400).json(error)
        })
    }

    /**
     * getAll
     */
    public async getAll(request : Request , response : Response) {
        await service.getAll().then( res => {
            return response.status(200).json( res);
        })
        .catch( error => {
            return response.status(400).json(error);
        })
    }

    /**
     * getById
     */
    public async getById( request : Request ,response : Response) {
        const admin_id : string = request.params.id;

        const validation = validate(admin_id);

        if( validation ){
            await service.get(admin_id).then( res => {
                if( res) {
                    return response.status(200).json(res);
                }else {
                    return response.status(200).json({sms : "usuário não encontrado!"});
                }
            })
            .catch( error => {
                return response.status(400).json( error);
            })
        }else {
            response.status(404).json({ sms : "id é inválido "})
        }
    }

    /**
     * update
     */
    public async update( request : Request ,response : Response) {
        const data : AdministradorDataUpdade = request.body;
        const admin_id : string = request.params.id;

        const validated  = validate(admin_id);

        if(validated){
            await service.update( admin_id , data).then( res => {
                return response.status(202).json(res);
            })
            .catch( error => {
                return response.status(402).json(error);
            })
        }else {
            response.status(400).json({sms : "id inválido"})
        }
    }

    /**
     * delete
     */
    public async delete(request : Request , response  : Response) {
        const admin_id :string = request.params.id;
        const validated = validate(admin_id);

        if( validated) {
            await service.delete( admin_id)
            .then( res => {
                if( res )
                    return response.status(200).json(res);
                
                return response.status(200).json({sms : "Usuário não encontrado"})
            })
            .catch( error => {
                return response.status(400).json(error);
            })
        }else {
            response.status(400).json({sms : "id inválido!"})
        }
    }
}