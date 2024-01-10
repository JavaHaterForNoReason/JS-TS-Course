const mongoose = require("mongoose");
const validator = require("validator");

const ContactSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  name: { type: String, required: true },
  lastname: { type: String, required: false, default: "" },
  email: { type: String, required: false, default: "" },
  tel: { type: String, required: false, default: "" },
  date: { type: Date, default: Date.now() },
});

const ContactModel = mongoose.model("Contacts", ContactSchema);

class Contact {
  constructor(body) {
    this.body = body ?? {};
    this.errors = [];
    this.contact = null;
  }

  async create() {
    this.validate();
    await this.contactExists();
    if (this.errors.length > 0) return;

    await ContactModel.create(this.body);
  }

  async update(id) {
    this.validate();
    if (this.errors.length > 0) return;

    this.contact = await ContactModel.findByIdAndUpdate(id, this.body, {
      new: true,
    });
  }

  async delete(id) {
    await ContactModel.findOneAndDelete({ _id: id });
  }

  async contactExists() {
    let conditions = [
      this.body.email && { email: this.body.email },
      this.body.tel && { tel: this.body.tel },
    ];
    conditions = conditions.filter((condition) => condition !== "");

    try {
      const contact = await ContactModel.findOne({
        $and: [
          {
            $or: conditions,
          },
          { userId: this.body.userId },
        ],
      });

      if (contact) this.errors.push("Contato já cadastrado");
    } catch (err) {
      console.error(err);
    }
  }

  validate() {
    this.clean();
    if (this.body.email && !validator.isEmail(this.body.email))
      this.errors.push("Email inválido");
    if (
      this.body.tel &&
      (/\D/g.test(this.body.tel) || this.body.tel.length !== 11)
    )
      this.errors.push("Telefone inválido");
    if (!this.body.email && !this.body.tel) {
      this.errors.push(
        "Ao menos um campo (email ou telefone) precisa ser preenchido"
      );
    }
    if (!this.body.name) this.errors.push("É preciso preencher um nome");
  }

  clean() {
    for (let key in this.body) {
      if (typeof this.body[key] !== "string") {
        this.body[key] = "";
      }
    }

    delete this.body._csrf;
  }

  static async findContacts(id) {
    const contacts = await ContactModel.find({ userId: id });
    return contacts;
  }

  static async getContact(id) {
    const contact = await ContactModel.findById(id);
    return contact;
  }
}

module.exports = Contact;
