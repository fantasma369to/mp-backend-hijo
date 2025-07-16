import express from "express";
import suscripcionesRoutes  from "./suscripciones.routes.js"
const router = express.Router();

router.use("/suscripciones",suscripcionesRoutes)

export default router;
