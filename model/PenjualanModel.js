import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Produk from "./ProdukModel.js";
import UserAuth from "./UserModel.js";
import Member from "./MemberModel.js";

const { DataTypes } = Sequelize;

const Penjualan = db.define(
  "penjualan",
  {
    nama: {
      type: DataTypes.STRING,
      references: {
        model: UserAuth,
        key: "nama",
      },
      allowNull: false,
    },
    noMember: {
      type: DataTypes.STRING,
      references: {
        model: Member,
        key: "noMember",
      },
      allowNull: true,
    },
    pembeli: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    noPenjualan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tglPembelian: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    tglPenjualan: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    kodeBarang: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    namaBarang: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    merek: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    distributor: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    h_beli: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    h_jual: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totHarga: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    diskon: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    potDiskon: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Penjualan;
