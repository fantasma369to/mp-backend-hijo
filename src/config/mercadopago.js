import mercadopago from "mercadopago";
import "dotenv/config";

const { MercadoPagoConfig } = mercadopago;
const mp = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});
export default mp;
