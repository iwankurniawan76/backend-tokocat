import { Sequelize } from "sequelize";

const db = new Sequelize("aplikasiku", "root", "", {
  host: "localhost",
  dialect: "mysql",
  dialectOptions: {
    charset: "utf8mb4",
  },
  logging: false, // Matikan log jika terlalu banyak output
});

export default db;
