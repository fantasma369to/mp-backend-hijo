import mercadopago from "mercadopago";
import mp from "../config/mercadopago.js";
import supabaseAlejandria from "../config/supabaseAlejandria.js";
import "dotenv/config";
const { PreApproval } = mercadopago;

export const CrearSuscripcion = async (req, res) => {
  const BACK_URL = process.env.BACK_URL;
  try {
    const {
      email,
      plan_nombre,
      frecuencia,
      monto,
      id_suscripcion_id_plan,
      frequency_type,
    } = req.body;
    const result = await new PreApproval(mp).create({
      body: {
        reason: plan_nombre,
        auto_recurring: {
          frequency: frecuencia || 1,
          frequency_type: frequency_type,
          start_date: new Date(Date.now() + 60 * 1000).toISOString(),
          transaction_amount: Number(monto),
          currency_id: "PEN",
        },
        payer_email: email,
        back_url: BACK_URL,
        status: "pending",
        external_reference: id_suscripcion_id_plan,
      },
    });
    console.log("✅ Suscripción creada:", result);

    const [id_suscripcion, id_plan] = result.external_reference.split("|");
    const { error } = await supabaseAlejandria
      .from("suscripciones")
      .update({ preapproval_id: result?.id })
      .eq("id", id_suscripcion);
    if (error) throw new Error("Error editando suscripcion: " + error.message);
    res.status(200).json({ init_point: result.init_point });
  } catch (error) {
    console.error("Error creando suscripción:", error);
    res.status(500).json({ error: "No se pudo crear la suscripción" });
  }
};
export const CancelarSuscripcion = async (req, res) => {
  res.status(200).json({ mensaje: "Esto es una prueba" });
};
export const PagoExitoso = async (req, res) => {
  const { preapproval_id } = req.query;
  if (!preapproval_id) {
    return res.redirect("https://codigo369.com/");
  }
  const result = await new PreApproval(mp).get({ id: preapproval_id });
  if (result.status !== "authorized") {
    return res.redirect("https://codigo369.com/");
  }
  const [id_suscripcion, id_plan] = result.external_reference.split("|");
  const { error } = await supabaseAlejandria
    .from("suscripciones")
    .update({ estado: result.status, id_plan: Number(id_plan) })
    .eq("id", Number(id_suscripcion));
  if (error) {
    throw new Error("Error actualizando Supabase: " + error.message);
  }
  return res.redirect("https://www.youtube.com/@Codigo369");

};
