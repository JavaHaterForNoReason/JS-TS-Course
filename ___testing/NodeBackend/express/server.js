const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello world!");
});
app.get("/contato", (req, res) => {
  res.send("Contato");
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
  console.log("Acessar: http://localhost:3000");
});

/**
 * Nodemon: Funciona de forma parecida com o -w (watch), ou seja,
 * ele fica "assistindo" o arquivo e, caso um alteração seja feita,
 * ele atualiza a página automaticamente.
 */
