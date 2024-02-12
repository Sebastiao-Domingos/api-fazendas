import { Router } from "express";
import { FazendaController } from "../controllers/FazendaController";
import {multerConfig}  from '../config/multer'
import multer from "multer";

const upload = multer(multerConfig)

const fazendasRoutes = Router();
const controller = new FazendaController();
const BASE_PATH = "/fazendas";
fazendasRoutes.post(BASE_PATH , upload.array("imagens"),controller.store);
fazendasRoutes.get( `${BASE_PATH}` , controller.get);
fazendasRoutes.get(`${BASE_PATH}/:id`, controller.find);
// provinciaRoutes.get(`/provinciasFindByName`, controller.findByName);
fazendasRoutes.put(`${BASE_PATH}/:id`, controller.updade);
fazendasRoutes.delete(`${BASE_PATH}/:id`,controller.delete);


export {fazendasRoutes}
