import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor activo en mp-backend-hijo-production.up.railway.app:${PORT}`);
  })
  .on("error", (err) => {
    console.log("Error al iniciar el servidor:", err);
  });
