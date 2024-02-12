import { Router } from "express";
import { ProvinciaController } from "../controllers/localizacao/ProvinciaController";
import { FazendaController } from "../controllers/FazendaController";

const fazendasRoutes = Router();
const controller = new FazendaController();
const BASE_PATH = "/fazendas";
fazendasRoutes.post(BASE_PATH,controller.create);
fazendasRoutes.get( `${BASE_PATH}` , controller.get);
fazendasRoutes.get(`${BASE_PATH}/:id`, controller.find);
// provinciaRoutes.get(`/provinciasFindByName`, controller.findByName);
fazendasRoutes.put(`${BASE_PATH}/:id`, controller.updade);
fazendasRoutes.delete(`${BASE_PATH}/:id`,controller.delete);


export {fazendasRoutes}
