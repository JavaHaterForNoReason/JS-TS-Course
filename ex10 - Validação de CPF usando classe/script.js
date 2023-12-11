class ValidaCPF {
  constructor(cpf) {
    if (cpf.trim()) {
      Object.defineProperty(this, "cpfLimpo", {
        enumerable: false,
        configurable: false,
        writable: false,
        value: (this.cpfLimpo = cpf.replace(/\D+/g, "")),
      });
      return;
    }
    this.setMessage("CPF não informado ou apenas espaços inseridos");
  }

  isSequential() {
    const sequence = this.cpfLimpo[0].repeat(this.cpfLimpo.length);
    return sequence === this.cpfLimpo;
  }

  isValid() {
    if (
      typeof this.cpfLimpo === "undefined" ||
      this.cpfLimpo.length !== 11 ||
      this.isSequential()
    ) {
      this.setMessage(
        "O CPF informado é inválido por: \n 1. não há números; \n 2. não há 11 números; \n 3. ou, é uma sequência do mesmo número"
      );
      return;
    }

    let partialCpf = this.cpfLimpo.slice(0, -2);
    const firstDigit = this.getDigits(partialCpf);
    partialCpf += firstDigit;
    const secondDigit = this.getDigits(partialCpf);
    partialCpf += secondDigit;

    partialCpf === this.cpfLimpo
      ? this.setMessage("CPF válido")
      : this.setMessage("CPF inválido");
  }

  getDigits(partialCpf) {
    partialCpf = Array.from(partialCpf);
    let counter = partialCpf.length + 1;

    const total = partialCpf.reduce((accumulator, value) => {
      accumulator += counter * Number(value);
      counter--;
      return accumulator;
    }, 0);

    const digit = 11 - (total % 11);
    return digit > 9 ? "0" : String(digit);
  }

  setMessage(msg) {
    console.log(msg);
  }
}

const cpf = new ValidaCPF("050.747.599-27");
console.log(cpf);
