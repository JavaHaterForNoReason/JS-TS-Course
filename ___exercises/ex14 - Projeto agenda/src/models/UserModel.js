const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  confirmPass: { type: String },
});

const UserModel = mongoose.model("Users", UserSchema);

class User {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  async enter() {
    this.validate();
    if (this.errors.length > 0) return;

    this.user = await UserModel.findOne({ email: this.body.email });

    if (!this.user) {
      this.errors.push("Usuário não existe");
      return;
    }

    if (!bcrypt.compareSync(this.body.password, this.user.password)) {
      this.errors.push("Senha incorreta");
      this.user = null;
      return;
    }
  }

  async register() {
    this.validate();
    await this.userExists();
    if (this.errors.length > 0) return;
    this.hashPass();

    this.user = await UserModel.create(this.body);
  }

  async changePass() {
    this.validate();
    if (this.errors.length > 0) return;

    this.user = await UserModel.findOne({ email: this.body.email });

    if (!this.user) {
      this.errors.push("Usuário não existe");
      return;
    }

    if (this.body.password !== this.body.confirmPass) {
      this.errors.push("As senhas não coincidem");
      return;
    }

    this.hashPass();

    await UserModel.updateOne(
      { _id: this.user._id },
      { password: this.body.password }
    );
  }

  validate() {
    this.clean();
    if (!validator.isEmail(this.body.email)) this.errors.push("Email inválido");
    if (!validator.isLength(this.body.password, { min: 6, max: 8 }))
      this.errors.push("A senha precisa ter entre 6 e 8 caracteres");
  }

  clean() {
    for (let key in this.body) {
      if (typeof this.body[key] !== "string") {
        this.body[key] = "";
      }
    }

    delete this.body._csrf;
  }

  async userExists() {
    try {
      const user = await UserModel.findOne({ email: this.body.email });

      if (user) this.errors.push("Este email já está sendo utilizado");
    } catch (err) {
      console.error(err);
    }
  }

  hashPass() {
    const salt = bcrypt.genSaltSync();
    this.body.password = bcrypt.hashSync(this.body.password, salt);
  }
}

module.exports = User;
