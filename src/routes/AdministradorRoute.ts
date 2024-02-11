import { Router } from "express";
import { AdministradorController } from "../controllers/AdministradorController";

const administradorRoutes = Router();
const controller = new AdministradorController();
const BASE_PATH = "/administradores"

administradorRoutes.post(BASE_PATH , controller.create)
administradorRoutes.get(BASE_PATH ,controller.getAll );
administradorRoutes.get(`${BASE_PATH}/:id`, controller.getById)
administradorRoutes.patch(`${BASE_PATH}/:id` , controller.update)
administradorRoutes.delete(`${BASE_PATH}/:id`, controller.delete)

export {administradorRoutes}