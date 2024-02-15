import express from "express";
import { routes } from "./routes";

const port = 3333;
const app =  express();
//app.use(express.json());
// const __dirname = path.resolve();

// app.use('/api-docs', swaggerUI.serve ,swaggerUI.setup(swaggerDocument))
// app.use("/upload" , express.static(path.join(__dirname,"/","uploads")))

// app.use(sessionRoute);
// app.use(administradorRoutes);
// app.use(provinciaRoutes);
// app.use(municipioRoutes);
// app.use(proprietarioRoutes)
// app.use(fazendasRoutes)

app.use(routes);

app.listen(port, () =>{
    console.log(`Esta rodando na porta ${port} !`);
})