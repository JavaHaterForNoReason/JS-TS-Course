const path = require("path");
const writeFile = require("./modules/writtingFiles");
const readFile = require("./modules/readingFiles");

const text = `
"O mundo não é um mar de rosas; é um lugar sujo, um lugar cruel, que não quer saber o quanto você é durão.\n
Vai botar você de joelhos e você vai ficar de joelhos para sempre se você deixar.\n 
Você, eu, ninguém vai bater tão forte como a vida, mas não se trata de bater forte.\n
Se trata de quanto você aguenta apanhar e seguir em frente, o quanto você é capaz de aguentar e continuar tentando.\n
É assim que se consegue vencer.

Agora se você sabe do teu valor, então vá atrás do que você merece, mas tem que estar preparado para apanhar.\n
E nada de apontar dedos, dizer que você não consegue por causa dele ou dela, ou de quem quer que seja.\n 
Só covardes fazem isso e você não é covarde, você é melhor que isso." - Balboa, Rocky
`;
let filePath = path.resolve(__dirname, "testfiles", "teste.txt");
writeFile(filePath, text);
console.log(filePath);

/**
 * ####################################################################################
 */

const pessoas = [
  { nome: "Luan" },
  { nome: "Gustavo" },
  { nome: "Mariano" },
  { nome: "Lara" },
];
const json = JSON.stringify(pessoas, "", 2);
filePath = path.resolve(__dirname, "testfiles", "teste.json");
writeFile(filePath, json);
console.log(filePath);

/**
 * Lendo arquivos
 */
const convertFile = async (path) => {
  const data = await readFile(path);
  return JSON.parse(data);
};

convertFile(filePath).then((data) => {
  data.forEach((value) => console.log(value.nome));
});
