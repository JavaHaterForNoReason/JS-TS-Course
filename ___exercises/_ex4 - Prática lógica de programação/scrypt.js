//Parte 1 - Escreva uma função que receba dois números e retorne o maior deles
const maior = (num1, num2) => (num1 > num2 ? num1 : num2);
console.log(`Teste: O maior número entre 1 e 2 é ${maior(1, 2)}`);

/**
 * Escreva uma função ePaisagem que recebe dois argumentos, largura e altura,
 * de uma paisagem (number). Retorne true se a imagem estiver em modo paisagem
 */
const ePaisagem = (largura, altura) => largura > altura;
console.log(
  `Teste: A imagem com as proporções 1080x1920 é paisagem? ${
    ePaisagem(1080, 1920) ? "Sim" : "Não"
  }`
);

/**
 * Escreva uma função que recebe um número e retorne o seguinte:
 * - Se o número é divisível por 3 = Fizz
 * - Se o número é divisível por 5 = Buzz
 * - Se o número é divisível por 3 e 5 = FizzBuzz
 * - Se o número NÂO é divisível por 3 e 4 = Retorna o próprio número
 * - Checar se o número é realmente um número = Retorna o que recebeu
 * Use a função com números de 0 a 100
 */
const fizzBuzz = (num) => {
  if (typeof num !== "number") return num;
  if (num % 3 === 0 && num % 5 === 0) return "FizzBuzz";
  if (num % 3 === 0) return "Fizz";
  if (num % 5 === 0) return "Buzz";

  return num;
};

for (let i = 0; i <= 100; i++) {
  console.log(i, fizzBuzz(i));
}
