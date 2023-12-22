const express = require("express");
const app = express();

//Para tratar de req.body
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(`
  <form action = "/" method = "POST">
    Nome do cliente: <input type = "text" name = "nome" />
    <button>Enviar</button>
  </form>
  `);
});
app.post("/", (req, res) => {
  res.send(`Nome enviado: ${req.body.nome}`);
});

app.get("/tests/:id?/:outro?", (req, res) => {
  //req.params pega os parâmetros, como /profiles/parametro1/parametro2
  //req.query pega a query string da url, como /profiles/?querystring=jsjdkabd&querystring2=jsndkajbdk
  res.send(req.params);
  // res.send(req.query);
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
  console.log("Acessar: http://localhost:3000");
});
