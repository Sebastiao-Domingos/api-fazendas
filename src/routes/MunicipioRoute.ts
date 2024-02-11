import { Router } from "express";
import { MunicipioController } from "../controllers/localizacao/MunicipioController";



const municipioRoutes = Router();
const BASE_PATH = "/municipios"
const controller = new MunicipioController();

municipioRoutes.get(BASE_PATH , controller.get);
municipioRoutes.get(`${BASE_PATH}/:id`, controller.find);
municipioRoutes.post( BASE_PATH , controller.create);
municipioRoutes.patch(`${BASE_PATH}/:id` , controller.update);
municipioRoutes.delete(`${BASE_PATH}/:id`,controller.delete)

export {municipioRoutes}