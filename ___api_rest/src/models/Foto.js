import Sequelize, { Model } from "sequelize";
import appConfig from "../config/app";

export default class Foto extends Model {
  static init(sequelize) {
    super.init(
      {
        original_name: {
          type: Sequelize.STRING,
          defaultValue: "",
          validate: {
            notEmpty: {
              msg: "Este campo não pode ficar vazio",
            },
          },
        },
        file_name: {
          type: Sequelize.STRING,
          defaultValue: "",
          validate: {
            notEmpty: {
              msg: "Este campo não pode ficar vazio",
            },
          },
        },
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `${appConfig.url}/images/${this.getDataValue("file_name")}`;
          },
        },
      },
      { sequelize }
    );
    return this;
  }
}
