import { Router } from "express";
import { ProvinciaController } from "../controllers/localizacao/ProvinciaController";

const provinciaRoutes = Router();
const controller = new ProvinciaController();
const BASE_PATH = "/provincias";
provinciaRoutes.post(BASE_PATH,controller.create);
provinciaRoutes.get( `${BASE_PATH}` , controller.get);
provinciaRoutes.get(`${BASE_PATH}/:id`, controller.find);
provinciaRoutes.get(`/provinciasFindByName`, controller.findByName);
provinciaRoutes.put(`${BASE_PATH}/:id`, controller.updade);
provinciaRoutes.delete(`${BASE_PATH}/:id`,controller.delete);


export {provinciaRoutes}
