import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../helpers/api-errors";
import jwt from "jsonwebtoken"
import { SECRET } from "../controllers/auth/Session";
import { AdministradorService } from "../services/AdministradorService";
import { PayLoadType } from "../repositories/SessionRepository";

const service = new AdministradorService();

export async function authMiddleware( request : Request, response : Response , next : NextFunction){

    const {authorization} = request.headers;

    if( !authorization ){
        response.status(401).json(new UnauthorizedError("Não autorizado!"))
    }

    const token = authorization?.split(" ")[1];

    try{
        const { id } = jwt.verify(token! , SECRET) as PayLoadType;
    
        const user = await service.get(id);
    
        if( !user){
            response.status(401).json(new UnauthorizedError("Não autorizado!"))
        }
    
        const {senha:_ , ...logedUSer} = user;
    
        request.user = logedUSer;
        
        next()

    }catch( error ) {
        response.status(401).json( new UnauthorizedError("Token invalido"))
    }
} 