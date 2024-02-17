import { Router } from "express";
import { sessionRoute } from "./SessionRoute";
import { administradorRoutes } from "./AdministradorRoute";
import { provinciaRoutes } from "./ProvinciaRoute";
import { municipioRoutes } from "./MunicipioRoute";
import { proprietarioRoutes } from "./ProprietarioRoute";
import { fazendasRoutes } from "./FazendaRoute";
import { authMiddleware } from "../middlewares/authMiddleware";
import swaggerUI from "swagger-ui-express";
import swaggerDocument from '../../swagger.json'
import express from "express"
import path from "path"


const routes = Router();
const __dirname = path.resolve();
routes.use(express.json());

routes.use('/api-docs', swaggerUI.serve ,swaggerUI.setup(swaggerDocument , {explorer : true}))


routes.use(sessionRoute);
routes.use(authMiddleware)
routes.use("/upload" , express.static(path.join(__dirname,"/","uploads")))
routes.use(administradorRoutes);
routes.use(provinciaRoutes)
routes.use(municipioRoutes);
routes.use(proprietarioRoutes);
routes.use(fazendasRoutes);

export {routes}