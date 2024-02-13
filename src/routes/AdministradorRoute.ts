import { Router } from "express";
import { AdministradorController } from "../controllers/AdministradorController";
import { authMiddleware } from "../middlewares/authMiddleware";

const administradorRoutes = Router();
const controller = new AdministradorController();
const BASE_PATH = "/administradores"
administradorRoutes.use(authMiddleware)
administradorRoutes.post(BASE_PATH , controller.create)
administradorRoutes.get(BASE_PATH ,controller.getAll );
administradorRoutes.get(`${BASE_PATH}/:id`, controller.getById)
administradorRoutes.patch(`${BASE_PATH}/:id` , controller.update)
administradorRoutes.delete(`${BASE_PATH}/:id`, controller.delete)
administradorRoutes.get("/profile", controller.getProfile);

export {administradorRoutes}