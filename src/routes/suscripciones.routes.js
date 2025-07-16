import express from "express";
import {
  CrearSuscripcion,
  CancelarSuscripcion,PagoExitoso
} from "../controllers/mercadopago.controller.js";
const router = express.Router();
router.post("/crear-suscripcion", CrearSuscripcion);
router.post("/cancelar-suscripcion", CancelarSuscripcion);
router.get("/pago-exitoso", PagoExitoso);
export default router;
