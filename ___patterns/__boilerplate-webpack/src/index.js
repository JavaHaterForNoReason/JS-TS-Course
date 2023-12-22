const nome = prompt("Informe seu nome");

const div = document.createElement("div");
const p = document.createElement("p");
p.innerText = `Olá ${nome}`;
div.appendChild(p);
document.body.appendChild(div);
