import { Request, Response } from "express";
import { SessionData,} from "../../repositories/SessionRepository";
import { BadRequestError, NotFoundError } from "../../helpers/api-errors";
import jwt from "jsonwebtoken"
import { SessionService } from "../../services/auth/Session";

const service = new SessionService();
export const SECRET = "sebaABCDFGsebaZXCVC"
export class SessionController {
    /**
     * login
     */
    public async login( request :Request , response :Response) {
        const data : SessionData = request.body

        const user = await service.login(data);

        if(user.status === "email"){
            response.status(400).json( new BadRequestError("E-mail ou senha inválida"))
        }
        if( user.status === "password"){
            response.status(404).json( new NotFoundError("Administrador não encontrado!"))
        }

        if( user.status === "okay"){
            const token = jwt.sign( 
                { 
                    id : user.user?.id,
                    nome : user.user?.nome,
                    email : user.user?.email
                },
                SECRET ,
                {
                    expiresIn : 60*60
                }
            )
            response.status(200).json({
                user: user.user!,
                token: token
            })
        }
    }

    /**
     * logout
     */
    public logout() {
        
    }
}