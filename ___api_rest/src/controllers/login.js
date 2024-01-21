import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario";

const create = async (req, res) => {
  try {
    const { email = "", password = "" } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        errors: ["Credenciais inválidas"],
      });
    }

    const user = await Usuario.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({
        errors: ["Usuário não encontrado"],
      });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({
        errors: ["Senha inválida"],
      });
    }

    const { id } = user;
    const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    return res.json({ token });
  } catch (e) {
    console.log(e);
    return res.json(null);
  }
};

export default create;
