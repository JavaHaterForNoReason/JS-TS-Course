const path = require("path");

module.exports = {
  mode: "development", //Modo "production" converte todo o código em um arquivo com uma única linha
  entry: "./src/index.js", //O arquivo onde será escrito o código e servirá de entrada
  output: {
    // Permite que o script funcione em qualquer sistema operacional,
    // pois o 'resolve' "decide" como serão postas as barras (/ ou \).
    // Portando, só precisa ser passado o nome das pastas
    // __dirname se refere ao diretório atual, ou seja, a pasta onde ESSE arquivo está
    path: path.resolve(__dirname, "public", "assets", "js"),
    filename: "bundle.js", // É o nome do arquivo de saída, padronizado como "bundle"
  },
  module: {
    rules: [
      {
        exclude: /node_modules/, //Exclui node_modules, pois senão poderá gerar lentidão com a análise
        //A extensão dos arquivos que serão analisados para gerar o bundle.js
        //$ indica que os arquivos terminam com a extensão .js
        test: /\.js$/,
        //O que vai ser utilizado para realizar a análise dos arquivos e códigos e gerar o bundle
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/env"],
          },
        },
      },
    ],
  },
  //Responsável pelo mapeamento dos arquivos
  //O arquivo de saída conterá códigos de diversos outros arquivos,
  //convertidos pelo Babel para que funcionem em todos os navegadores,
  //por isso o mapeamento é necessário para que seja possível realizar
  //debug mais facilmente, mapeando erros e logs pelo arquivo original e não pelo bundle.js
  devtool: "source-map",
};
