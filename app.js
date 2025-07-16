import express from "express";
import cors from "cors";
import { errorHandler } from "./src/middlewares/errorHandler.js";
import routes from "./src/routes/main.routes.js"

const app = express();

//Habilitamos cors para que se pueda consumir desde otros origenes (localhost)
app.use(cors());

//Es para que express pueda leer los datos en formato Json en las peticiones
app.use(express.json());

//registramos ruta base
app.use("/api",routes)
//Manejador de errores que vendria a ser un Middleware  global
app.use(errorHandler);

export default app;

