const app = require("./app");

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('***********************************************');
  console.log(`Servidor en http://localhost:${PORT}`);
  console.log('***********************************************');
});
