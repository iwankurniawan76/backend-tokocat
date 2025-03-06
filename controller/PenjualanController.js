import Penjualan from "../model/PenjualanModel.js";
import Produk from "../model/ProdukModel.js";
import { Op } from "sequelize";

export const getAllPenjualan = async (req, res) => {
  try {
    const penjualan = await Penjualan.findAll();
    res.json(penjualan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Saat Button Bayar diklik
export const createPenjualan = async (req, res) => {
  try {
    const {
      id,
      nama,
      pembeli,
      tglPembelian,
      noMember,
      noPenjualan,
      tglPenjualan,
      kodeBarang,
      distributor,
      merek,
      namaBarang,
      h_beli,
      h_jual,
      totHarga,
      quantity,
      diskon,
      potDiskon,
    } = req.body;

    const barang = await Produk.findOne({
      where: { id },
    });
    // cek stok barang
    if (!barang) {
      return res.status(404).json({ message: "Barang tidak ditemukan" });
    }

    if (barang.quantity === 0) {
      return res
        .status(400)
        .json({ message: "Transaksi dibatalkan: stok barang habis" });
    }

    if (quantity > barang.quantity) {
      return res.status(400).json({
        message: "Transaksi dibatalkan: quantity melebihi stok tersedia",
      });
    }

    const penjualan = await Penjualan.create({
      nama,
      pembeli,
      tglPembelian,
      noMember: noMember === "" ? null : noMember,
      noPenjualan,
      tglPenjualan,
      kodeBarang,
      namaBarang,
      distributor,
      merek,
      h_beli,
      h_jual,
      totHarga,
      quantity,
      diskon,
      potDiskon,
    });

    res.json(penjualan);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getBySearch = async (req, res) => {
  try {
    const keySearch = req.params.keySearch || "";
    const safeKeySearch = keySearch.replace(/[%_]/g, "\\$&"); // Escape karakter SQL

    const barang = await Produk.findAll({
      where: {
        [Op.or]: [
          { produk: { [Op.like]: `%${safeKeySearch}%` } }, // LIKE namaProduk
          { distributor: { [Op.like]: `%${safeKeySearch}%` } }, // LIKE merek
          { merek: { [Op.like]: `%${safeKeySearch}%` } }, // LIKE merek
        ],
      },
      order: [["createdAt", "ASC"]],
    });
    if (!barang || !Array.isArray(barang)) {
      return res
        .status(404)
        .json({ message: "Barang tidak ditemukan", data: [] });
    } else {
      console.log(barang);
      res.json(barang);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getByDate = async (req, res) => {
  try {
    console.log("mulaiii");
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;

    const barang = await Penjualan.findAll({
      where: {
        tglPenjualan: {
          [Op.between]: [new Date(startDate), new Date(endDate)],
        },
      },
      order: [["createdAt", "ASC"]],
    });
    if (!barang || !Array.isArray(barang)) {
      return res
        .status(404)
        .json({ message: "Barang tidak ditemukan", data: [] });
    } else {
      console.log(barang);
      res.json(barang);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const deletePenjualan = async (req, res) => {
  try {
    const noPenjualan = req.params.noPenjualan;
    await Penjualan.destroy({ where: { noPenjualan } });
    res.json({ message: "Penjualan berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
