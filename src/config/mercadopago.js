import mercadopago from "mercadopago";

const { MercadoPagoConfig } = mercadopago;
const mp = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});
export default mp;
