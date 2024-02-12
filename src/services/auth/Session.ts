import { PrismaClient } from "@prisma/client";
import { SessionData,  SessionDataService, SessionRepository } from "../../repositories/SessionRepository";

const prisma = new PrismaClient();
export class SessionService implements SessionRepository{
    public async login (data: SessionData): Promise<SessionDataService>{
        const { email} = data;
        
        if( await validatorEmail(email)){
            return {
                user:  null,
                status: "email"
            }
        }
        const dataUser =  await validatorUser(data);

        if( !dataUser){
            return {
                user:  null,
                status: "password"
            }
        }else {
            return {
                user:  dataUser,
                status: "okay"
            }
        }
    };

    public logout () {

    };
} 


async function validatorEmail( email :string){
    const user = await prisma.administrador.findUnique({
        where : {email}
    }) 
    if(!user) return true;
    return false;
}

async function validatorUser( user : SessionData){
    const userFound = await prisma.administrador.findUnique({
        where : {
            email : user.email,
            senha : user.senha
        },
        select : {
            nome : true,
            email :true
        }
    }) 
    return userFound;
}