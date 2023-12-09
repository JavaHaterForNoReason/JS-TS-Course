function ValidaCPF(cpf) {
  Object.defineProperty(this, "cpfLimpo", {
    get: function () {
      return cpf.replace(/\D+/g, "");
    },
  });
}

ValidaCPF.prototype.calcDigits = function (partialCpf) {
  partialCpf = Array.from(partialCpf);
  let counter = partialCpf.length + 1;

  const total = partialCpf.reduce((accumulator, value) => {
    accumulator += counter * Number(value);
    counter--;
    return accumulator;
  }, 0);

  const digit = 11 - (total % 11);

  return digit > 9 ? "0" : String(digit);
};

ValidaCPF.prototype.isSequential = function () {
  const sequence = this.cpfLimpo[0].repeat(this.cpfLimpo.length);
  return sequence === this.cpfLimpo;
};

ValidaCPF.prototype.isValid = function () {
  if (
    typeof this.cpfLimpo === "undefined" ||
    this.cpfLimpo.length !== 11 ||
    this.isSequential()
  )
    return false;

  let partialCpf = this.cpfLimpo.slice(0, -2);
  const firstDigit = this.calcDigits(partialCpf);
  partialCpf = partialCpf + firstDigit;
  const secondDigit = this.calcDigits(partialCpf);
  partialCpf = partialCpf + secondDigit;

  return this.cpfLimpo === partialCpf;
};

const cpf = new ValidaCPF("050.747.599-27");
console.log(cpf.isValid() ? "O CPF é válido" : "CPF inválido");
