import express from "express";
import swaggerUI from "swagger-ui-express";
import swaggerDocument from '../swagger.json'
import { administradorRoutes } from "./routes/AdministradorRoute";
import { provinciaRoutes } from "./routes/ProvinciaRoute";
import { municipioRoutes } from "./routes/MunicipioRoute";
import { proprietarioRoutes } from "./routes/ProprietarioRoute";
import { fazendasRoutes } from "./routes/FazendaRoute";
import path from "path";
import { sessionRoute } from "./routes/SessionRoute";

const app =  express();
app.use(express.json());
const port = 3333;
const __dirname = path.resolve();

app.use('/api-docs', swaggerUI.serve ,swaggerUI.setup(swaggerDocument))
app.use("/upload" , express.static(path.join(__dirname,"/","uploads")))

app.use(sessionRoute);
app.use(administradorRoutes);
app.use(provinciaRoutes);
app.use(municipioRoutes);
app.use(proprietarioRoutes)
app.use(fazendasRoutes)

app.listen(port, () =>{
    console.log(`Esta rodando na porta ${port} !`);
})