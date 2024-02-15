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
fazendasRoutes.put(`${BASE_PATH}/dados/:id`, controller.update);
fazendasRoutes.put(`${BASE_PATH}/imagem/:id`,upload.single("imagem"), controller.updateImage);
fazendasRoutes.delete(`${BASE_PATH}/:id`,controller.delete);

export {fazendasRoutes}
