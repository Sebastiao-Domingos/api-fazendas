import { AdministradorData } from "../repositories/AdministradorRepository";

declare global {
    namespace Express {
        export interface Request {
            user : Partial<AdministradorData>
        }
    }
}