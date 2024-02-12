import { Router } from "express";
import { SessionController } from "../controllers/auth/Session";


const sessionRoute = Router();

sessionRoute.post("/session" , new SessionController().login);

export {sessionRoute}