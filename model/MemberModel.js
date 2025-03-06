import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Member = db.define(
  "member",
  {
    noMember: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    pembeli: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    alamat: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Member;
