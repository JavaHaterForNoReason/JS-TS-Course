const fs = require("fs").promises;

module.exports = (path, data) => {
  /*
flag -- Essa propriedade indica a forma como será escrito o arquivo.
Caso seja passado 'w' como flag, tudo que estiver no arquivo será
apagado e substituído pelos dados passados em writeFile(). Já se
for passado a flag 'a', apenas será concatenado ao que já está
no arquivo.

encoding -- Essa propriedade indica o padrão de codificação que
será usado para escrever os dados enviados em writeFile(). Por
padrão, o encoding será no formato utf-8.
*/
  fs.writeFile(path, data, { flag: "w" });
};
