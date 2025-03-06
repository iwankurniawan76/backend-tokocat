import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Produk = db.define(
  "produk",
  {
    kodeBarang: { type: DataTypes.STRING, allowNull: false },
    distributor: { type: DataTypes.STRING, allowNull: true },
    produk: { type: DataTypes.STRING, allowNull: false },
    merek: { type: DataTypes.STRING, allowNull: true },
    tglPembelian: { type: DataTypes.DATE, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    satuan: { type: DataTypes.STRING, allowNull: true },
    h_beli: { type: DataTypes.INTEGER, allowNull: false },
    h_jual: { type: DataTypes.INTEGER, allowNull: false },
    diskon: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    freezeTableName: true,
  }
);

export default Produk;
