import { Router } from "express";
import { ProprietarioController } from "../controllers/ProprietarioController";

const proprietarioRoutes = Router();
const controller = new ProprietarioController();
const BASE_PATH = "/proprietarios";

proprietarioRoutes.post(BASE_PATH,controller.create);
proprietarioRoutes.get( `${BASE_PATH}` , controller.get);
proprietarioRoutes.get(`${BASE_PATH}/:id`, controller.find);
proprietarioRoutes.get(`/proprietariosFindByName`, controller.findByName);
proprietarioRoutes.put(`${BASE_PATH}/:id`, controller.updade);
proprietarioRoutes.delete(`${BASE_PATH}/:id`,controller.delete);

export {proprietarioRoutes}
