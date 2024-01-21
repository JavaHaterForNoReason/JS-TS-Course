import Usuario from "../models/Usuario";

const index = async (req, res) => {
  try {
    const users = await Usuario.findAll();
    return res.json(users);
  } catch (e) {
    return res.json(null);
  }
};

const create = async (req, res) => {
  try {
    const user = await Usuario.create(req.body);
    const { id, name, email } = user;
    return res.json({ id, name, email });
  } catch (e) {
    return res.status(401).json({
      errors: e.errors.map((err) => err.message),
    });
  }
};

const show = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Usuario.findByPk(id);
    return res.json(user);
  } catch (e) {
    return res.json(null);
  }
};

const update = async (req, res) => {
  try {
    const id = req.userId;

    if (!id) {
      return res.status(401).json({
        errors: ["ID não enviado"],
      });
    }
    let user = await Usuario.findByPk(id);

    if (!user) {
      return res.status(401).json({
        errors: ["Usuário não encontrado"],
      });
    }

    user = await user.update(req.body);
    const { name, email } = user;
    return res.json({ id, name, email });
  } catch (e) {
    return res.status(401).json({
      errors: e.errors.map((err) => err.message),
    });
  }
};

const remove = async (req, res) => {
  try {
    const id = req.userId;

    if (!id) {
      return res.status(401).json({
        errors: ["ID não enviado"],
      });
    }
    const user = await Usuario.findByPk(id);

    if (!user) {
      return res.status(401).json({
        errors: ["Usuário não encontrado"],
      });
    }

    await user.destroy();
    return res.json(null);
  } catch (e) {
    console.log(e);
    return res.status(401).json({
      errors: e.errors.map((err) => err.message),
    });
  }
};

export { index, create, show, update, remove };
