export default class ValidaCPF {
  constructor(cpf) {
    if (cpf.trim()) {
      Object.defineProperty(this, "cpfLimpo", {
        enumerable: false,
        configurable: false,
        writable: false,
        value: (this.cpfLimpo = cpf.replace(/\D+/g, "")),
      });
    }
  }

  static isSequential() {
    const sequence = this.cpfLimpo[0].repeat(this.cpfLimpo.length);
    return sequence === this.cpfLimpo;
  }

  isValid() {
    if (
      typeof this.cpfLimpo === "undefined" ||
      this.cpfLimpo.length !== 11 ||
      this.isSequential()
    ) {
      return false;
    }

    let partialCpf = this.cpfLimpo.slice(0, -2);
    const firstDigit = ValidaCPF.getDigits(partialCpf);
    partialCpf += firstDigit;
    const secondDigit = ValidaCPF.getDigits(partialCpf);
    partialCpf += secondDigit;

    return partialCpf === this.cpfLimpo;
  }

  static getDigits(partialCpf) {
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
}
