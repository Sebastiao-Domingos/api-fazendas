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
import swaggerJSDoc from "swagger-jsdoc";
import express from "express"
import path from "path"


const options = {
    definition: {
      openapi: "3.1.0",
      info: {
        title: "LogRocket Express API with Swagger",
        version: "0.1.0",
        description:
          "This is a simple CRUD API application made with Express and documented with Swagger",
        license: {
          name: "MIT",
          url: "https://spdx.org/licenses/MIT.html",
        },
        contact: {
          name: "LogRocket",
          url: "https://logrocket.com",
          email: "info@email.com",
        },
      },
      servers: [
        {
          url: "http://localhost:3333",
        },
      ],
    },
    apis: ["./routes/*.js"],
};
  
const spec = swaggerJSDoc(options);

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