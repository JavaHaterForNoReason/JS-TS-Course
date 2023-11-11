const container = document.querySelector(".container");
const form = document.querySelector(".form");
const inputPeso = document.getElementById("peso");
const inputAltura = document.getElementById("altura");

form.addEventListener("submit", (e) => getIMC(e));

const getIMC = (e) => {
  e.preventDefault();
  //Remove o parágrafo criado anteriormente se você
  //adiciona novos dados e clica no botão
  container.removeChild(container.lastChild);

  let peso = inputPeso.value;
  let altura = inputAltura.value;

  //Verifica se os dados inseridos de altura e peso
  //possuem vírgula e, se sim, troca por ponto,
  //considerando que o código entende com ponto
  if (altura.includes(",")) {
    altura = altura.replace(",", ".");
  }
  if (peso.includes(",")) {
    peso = peso.replace(",", ".");
  }

  //Verifica se existem dados e, se não tem,
  //apresenta na tela a mensagem abaixo
  //O else if verifica se os dados pegos são
  //números, se não forem ele apresenta aquela msg
  if (!peso || !altura) {
    showMessage("Preencha todos os campos", "invalid");
    return;
  } else if (isNaN(peso) || isNaN(altura)) {
    showMessage("Insira valores válidos", "invalid");
    return;
  }

  //Verifica se o peso não é maior que
  //o maior peso registrado
  if (Number(peso) > 600) {
    showMessage(
      "O peso inserido ultrapassa o da pessoa mais pesada já registrada",
      "invalid"
    );
    return;
  }
  //Verifica se a altura não é maior que
  //o da maior pessoa atualmente
  if (Number(altura) > 2.51) {
    showMessage(
      "A altura inserida ultrapassa o da pessoa mais alta atualmente",
      "invalid"
    );
    return;
  }

  const imc = (Number(peso) / Number(altura) ** 2).toFixed(2);
  const imcDegree = getDegree(imc);

  const msg = `Seu IMC é ${imc.replace(".", ",")}: ${imcDegree}`;

  //Apenas para mudar a cor de fundo do
  //texto de resultado
  const status = getStatus(imc);

  showMessage(msg, status);
};

//Pega o status para mudar a cor de
//fundo do parágrafo de acordo com o imc
const getStatus = (imc) => {
  if (imc < 18.5 || imc >= 35) return "danger";
  else if (imc >= 18.5 && imc < 25) return "ok";
  else if (imc >= 25 && imc < 35) return "warning";
  // else if (imc >= 35) return "danger";
};

const getDegree = (imc) => {
  const degree = [
    "Abaixo do peso",
    "Peso normal",
    "Sobrepeso",
    "Obesidade grau 1",
    "Obesidade grau 2",
    "Obesidade grau 3",
  ];

  if (imc < 18.5) return degree[0];
  else if (imc >= 18.5 && imc < 25) return degree[1];
  else if (imc >= 25 && imc < 30) return degree[2];
  else if (imc >= 30 && imc < 35) return degree[3];
  else if (imc >= 35 && imc < 40) return degree[4];
  else if (imc >= 40) return degree[5];
};

const showMessage = (msg, status) => {
  const p = createP();
  p.innerHTML = msg;
  p.classList.add(status);

  container.appendChild(p);
};

const createP = () => {
  const paragraph = document.createElement("p");
  return paragraph;
};
