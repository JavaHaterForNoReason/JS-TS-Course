const geraSenha = () => {
  const button = document.getElementById("generator-button");

  button.addEventListener("click", () => {
    const qtty = document.getElementById("char-qtty");
    const checkInputs = document.querySelectorAll(".input");
    const passLength = Number(qtty.value);

    if (passLength <= 0) {
      setMsg("Valor indevido");
      return;
    }

    let charset = [];
    checkInputs.forEach((checkInput) => {
      const checkbox = checkInput.querySelector("input");

      if (checkbox.checked) {
        const id = checkbox.id;
        switch (id) {
          case "num":
            /*
            Array.from({ length: 26 }, (_, i) =>
                String.fromCharCode(97 + i)
              ).join("")

            Esse trecho de código cria um array(vetor) do zero usando
            a classe Array com método from(). Dentro dos parâmetros da
            função, é passado um objeto literal com o tamanho desejado
            do array. O outro parâmetro é uma função de mapeamento se-
            melhante a Array.map(), ou seja, ela vai iterar sobre os 
            elementos do array em questão. Nesse caso, ela irá iterar
            a quantidade de vezes igual o tamanho passado no objeto.
            Como parâmetros, ela espera o valor do elemento atual sendo
            iterado, o índice do elemento atual no array e o array em si.
            Como neste caso não há array original nem valor, o que essa
            função de mapeamento está fazendo é criando cada elemento e a-
            dicionando-o ao respectivo índice (o _ no parâmetro faz ignorar
            o primeiro elemento esperado como parâmetro, que seria o valor
            do elemento)

            String.fromCharCode(97 + i)

            Essa parte chama o método fromCharCode do objeto String. O que ele
            faz é retornar o caractere do código ASCII passado como parâmetro. 
            Neste caso, ele pega o caractere de código 97+i, sendo i o índice
            do array dado pela função de mapeamento em Array.from(). Por estar
            em uma arrow function, (_, i) => String.fromCharCode(97 + i) retor-
            na o caractere. 

            Por fim, o método join("") transformará o array formado pelo método
            from() em uma string contendo todos os elementos do array.
            */
            charset.push(Array.from({ length: 10 }, (_, i) => i).join(""));
            break;
          case "uppercase":
            charset.push(
              Array.from({ length: 26 }, (_, i) =>
                String.fromCharCode(65 + i)
              ).join("")
            );
            break;
          case "lowercase":
            charset.push(
              Array.from({ length: 26 }, (_, i) =>
                String.fromCharCode(97 + i)
              ).join("")
            );
            break;
          case "symbols":
            charset.push("/*-+.,;-_!@#$%&()[]{}?\\");
            break;
          default:
            break;
        }
      }
    });

    if (charset.length === 0) {
      setMsg("Ao menos uma opção deve ser selecionada");
      return;
    }

    let password = generatePass(charset.join(""), passLength);
    setMsg(password, "success");
  });
};

const setMsg = (msg, status = "error") => {
  const result = document.querySelector(".result");
  const span = result.querySelector("span");
  const copyBtn = result.querySelector("button");

  span.className = "";
  span.classList.add(status);

  if (msg) {
    const aux = msg > 30 ? msg.slice(0, 30) + "..." : msg;

    if (status === "error" || msg === "Senha copiada") {
      copyBtn.style.display = "none";
    } else {
      copyBtn.style.display = "block";
      copyBtn.addEventListener("click", () => {
        copyText(msg);
      });
    }

    span.innerText = aux;
    result.style.cssText = `
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    `;
    return;
  }

  result.style.display = "none";
};

const copyText = (text) => {
  navigator.clipboard
    .writeText(text)
    .then(() => setMsg("Senha copiada", "success"))
    .catch((e) => {
      setMsg("Erro ao copiar");
      console.error(e);
    });
};

const generatePass = (charset, length) => {
  let password = "";

  for (let i = 0; i < length; i++) {
    const randIndex = Math.floor(Math.random() * charset.length);
    password += charset[randIndex];
  }

  return password;
};

export default geraSenha;
