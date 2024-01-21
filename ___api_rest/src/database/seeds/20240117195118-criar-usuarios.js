const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "usuarios",
      [
        {
          name: "John Doe",
          email: "john@gmail.com",
          password_hash: await bcrypt.hash("123456", 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Pete Doe",
          email: "pete@gmail.com",
          password_hash: await bcrypt.hash("123456", 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Karlos Doe",
          email: "parlos@gmail.com",
          password_hash: await bcrypt.hash("123456", 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {},
};
