let password;
let valid = true;

class ValidaFormulario {
  constructor() {
    this.form = document.querySelector(".form");
    this.divInputs = document.querySelectorAll(".input");
    this.getEvents();
  }

  getEvents() {
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      console.log("Dados enviados");
    });

    this.divInputs.forEach((divInput) => {
      const input = divInput.querySelector("input");
      const span = divInput.querySelector("span");

      input.addEventListener("blur", () => {
        const isValid = this.verifyValidity(input, span);
        if (isValid) {
          if (input.classList.contains("invalid"))
            input.classList.remove("invalid");

          input.classList.add("valid");
        } else input.classList.add("invalid");
      });
    });
  }

  verifyValidity(input, span) {
    if (!input.value) {
      this.getErrorMsg(span, "*Campo obrigatório");
      return;
    }

    if (input.id === "cpf" && !this.validateCpf(input.value, span)) return;

    if (
      input.id === "user" &&
      !(input.value.length >= 3 && input.value.length <= 12)
    ) {
      this.getErrorMsg(span, "*O usuário deve possuir entre 3 e 12 caracteres");
      return;
    }

    if (input.id === "pass") {
      password = input.value;

      if (!(input.value.length >= 6 && input.value.length <= 12)) {
        this.getErrorMsg(span, "*A senha deve possuir entre 6 e 12 caracteres");
        return;
      }
    }

    if (input.id === "re-pass" && input.value !== password) {
      this.getErrorMsg(span, "*As senhas não coincidem");
      return;
    }

    this.getErrorMsg(span, "");
    return valid;
  }

  getErrorMsg(span, msg) {
    if (msg) {
      span.innerText = msg;
      span.style.display = "block";
      return;
    }

    span.style.display = "none";
  }

  validateCpf(cpf, span) {
    cpf = new ValidaCPF(cpf);

    if (!cpf.isValid()) {
      this.getErrorMsg(span, "*CPF inválido");
      return false;
    }
    return true;
  }
}

const validacao = new ValidaFormulario();
