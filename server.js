const express = require("express");
const path = require("path");

const app = express();

// Sirve los archivos estáticos generados por React
app.use(express.static(path.join(__dirname, "build")));

// Para cualquier otra solicitud, responde con el archivo index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Configura el puerto
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor funcionando en el puerto ${port}`);
});
