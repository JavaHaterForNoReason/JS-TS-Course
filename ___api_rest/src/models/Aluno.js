import Sequelize, { Model } from "sequelize";

export default class Aluno extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: Sequelize.STRING,
          defaultValue: "",
          validate: {
            len: {
              args: [3, 255],
              msg: "Nome não pode ser vazio",
            },
          },
        },
        lastname: {
          type: Sequelize.STRING,
          defaultValue: "",
          validate: {
            len: {
              args: [3, 255],
              msg: "Sobrenome não pode ser vazio",
            },
          },
        },
        email: {
          type: Sequelize.STRING,
          defaultValue: "",
          unique: {
            msg: "Email já existe",
          },
          validate: {
            isEmail: {
              msg: "Email inválido",
            },
          },
        },
        age: {
          type: Sequelize.INTEGER,
          validate: {
            min: {
              args: [0],
              msg: "A idade não pode ser negativa",
            },
            isInt: {
              msg: "Idade precisa ser um número inteiro",
            },
          },
        },
        weight: {
          type: Sequelize.FLOAT,
          validate: {
            min: {
              args: [0],
              msg: "O peso não pode ser negativo",
            },
            isFloat: {
              msg: "Peso precisa ser um número",
            },
          },
        },
        height: {
          type: Sequelize.FLOAT,
          validate: {
            min: {
              args: [0],
              msg: "A altura não pode ser negativa",
            },
            isFloat: {
              msg: "Peso precisa ser um número",
            },
          },
        },
      },
      { sequelize }
    );
    return this;
  }

  static associate(models) {
    this.hasMany(models.Foto, { foreignKey: "aluno_id" });
  }
}
