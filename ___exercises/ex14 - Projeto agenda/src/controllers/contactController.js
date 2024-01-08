const Contact = require("../models/ContactModel");

exports.index = async (req, res) => {
  try {
    res.render("contacts", {
      contacts: await Contact.findContacts(req.session.user._id),
    });
  } catch (err) {
    console.error(err);
    res.render("error");
  }
};

exports.add = (req, res) => {
  res.render("new-contact", {
    title: "Novo contato",
    subtitle: "Adicione um novo contato a sua lista de contatos",
    contact: {},
  });
};

exports.create = async (req, res) => {
  try {
    const data = {
      userId: req.session.user._id,
      ...req.body,
    };
    const contact = new Contact(data);
    await contact.create();

    if (contact.errors.length > 0) {
      req.flash("errors", contact.errors);
      req.session.save(() => {
        return res.redirect("/contact/add");
      });
      return;
    }

    res.redirect("/contact/index");
  } catch (err) {
    console.error(err);
    res.render("error");
  }
};

exports.edit = async (req, res) => {
  if (!req.params.id) return res.render("error");

  try {
    res.render("new-contact", {
      title: "Editar contato",
      subtitle: "",
      contact: await Contact.getContact(req.params.id),
    });
  } catch (err) {
    console.error(err);
    res.render("error");
  }
};

exports.update = async (req, res) => {
  try {
    const data = {
      userId: req.session.user._id,
      ...req.body,
    };
    const contact = new Contact(data);
    await contact.update(req.params.id);

    if (contact.errors.length > 0) {
      req.flash("errors", contact.errors);
      req.session.save(() => {
        return res.redirect(`/contact/edit/${req.params.id}`);
      });
      return;
    }

    res.redirect("/contact/index");
  } catch (err) {
    console.error(err);
    res.render("error");
  }
};

exports.delete = async (req, res) => {
  try {
    const contact = new Contact();
    await contact.delete(req.params.id);
    res.redirect("/contact/index");
  } catch (err) {
    console.error(err);
    res.render("error");
  }
};
