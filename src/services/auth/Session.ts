import { PrismaClient } from "@prisma/client";
import { SessionData,  SessionDataService, SessionRepository } from "../../repositories/SessionRepository";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();
export class SessionService implements SessionRepository{
    public async login (data: SessionData): Promise<SessionDataService>{
        const { email ,senha} = data;
        
        const user = await validatorEmail(email)
        if( !user ){
            return {
                user:  null,
                status: "email"
            }
        }

        const verifyPass = await bcrypt.compare(senha , user.senha )
        if( !verifyPass){
            return {
                user:  null,
                status: "password"
            }
        }else {
            const {senha:_ , ...filteredUser} = user;
            return {
                user:  filteredUser,
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

    return user;
}