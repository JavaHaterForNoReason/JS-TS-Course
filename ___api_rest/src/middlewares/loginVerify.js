import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario";

export default async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      errors: ["É preciso estar logado"],
    });
  }

  const [, token] = authorization.split(" ");

  try {
    const data = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = data;

    const user = await Usuario.findOne({ where: { id, email } });

    if (!user) {
      return res.status(401).json({
        errors: ["Usuário inválido"],
      });
    }

    req.userId = id;
    req.userEmail = email;
    return next();
  } catch (e) {
    return res.status(401).json({
      errors: ["Token inválido ou expirado"],
    });
  }
};
