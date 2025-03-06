import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const UsersAuth = db.define(
  "userauth",
  {
    nama: { type: DataTypes.STRING, unique: true },
    status: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    fotoProfil: { type: DataTypes.STRING, allowNull: true }, // Path gambar
    refresh_token: { type: DataTypes.TEXT, allowNull: true },
  },
  {
    freezeTableName: true,
  }
);

export default UsersAuth;

// (async () => {
//   await db.sync();
// })();
