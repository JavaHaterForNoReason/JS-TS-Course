exports.homePage = (req, res) => {
  res.send(`
  <form action = "/" method = "POST">
    Nome do cliente: <input type = "text" name = "nome" />
    <button>Enviar</button>
  </form>
  `);
};
exports.homePagePost = (req, res) => {
  res.send("Recebido");
};
