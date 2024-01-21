import Sequelize from "sequelize";
import dbConfig from "../config/database";
import Aluno from "../models/Aluno";
import Usuario from "../models/Usuario";
import Foto from "../models/Foto";

const models = [Aluno, Usuario, Foto];
const connection = new Sequelize(dbConfig);

models.forEach((model) => model.init(connection));
models.forEach(
  (model) => model.associate && model.associate(connection.models)
);
