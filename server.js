
import app from "./app.js";


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor activo en http://localhost:${PORT}`);
  })
  .on("error", (err) => {
    console.log("Error al iniciar el servidor:", err);
  });
