import validator from "validator";

class Form {
  constructor(selector) {
    this.form = document.querySelector(selector);
    this.err = false;
  }

  init() {
    this.form && this.getEvents();
  }

  getEvents() {
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.clearErrSpans();
      this.validate();
    });
  }

  validate() {
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    if (!email.value || !validator.isEmail(email.value)) {
      this.setErrMsg("Email inválido", email);
      this.err = true;
    }
    if (
      !password.value ||
      password.value.length < 6 ||
      password.value.length > 8
    ) {
      this.setErrMsg("A senha precisa ter entre 6 e 8 caracteres", password);
      this.err = true;
    }

    !this.err && this.form.submit();
  }

  setErrMsg(msg, input) {
    const span = document.createElement("span");
    span.innerText = msg;
    span.classList.add("error");

    input.parentNode.insertBefore(span, input.nextSibling);
  }

  clearErrSpans() {
    this.err = false;
    const errSpans = document.querySelectorAll(".error");
    errSpans.forEach((span) => {
      span.parentNode.removeChild(span);
    });
  }
}

export class Signup extends Form {
  validate() {
    const confirmPass = document.getElementById("confirmPass");
    const password = document.getElementById("password");

    if (!confirmPass.value || confirmPass.value !== password.value) {
      this.setErrMsg("As senhas não coincidem", confirmPass);
      this.err = true;
    }

    super.validate();
  }
}

export class Contact extends Form {
  validate() {
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const tel = document.getElementById("tel");

    if (!name.value) {
      this.setErrMsg("Você precisa inserir um nome", name);
      this.err = true;
    }
    if (email.value && !validator.isEmail(email.value)) {
      this.setErrMsg("Email inválido", email);
      this.err = true;
    }
    if (tel.value && (tel.value.length !== 11 || /\D/g.test(tel.value))) {
      this.setErrMsg("Telefone inválido", tel);
      this.err = true;
    }
    if (!email.value && !tel.value) {
      this.setErrMsg(
        "Ao menos um campo (email ou telefone) precisa ser preenchido",
        email
      );
      this.setErrMsg(
        "Ao menos um campo (email ou telefone) precisa ser preenchido",
        tel
      );
      this.err = true;
    }

    !this.err && this.form.submit();
  }
}

export class Login extends Form {}

export class ChangePass extends Signup {}
