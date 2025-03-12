import Member from "../model/MemberModel.js";
import { Op } from "sequelize";

export const getAllMember = async (req, res) => {
  try {
    const rawMember = await Member.findAll();
    return res.json(rawMember);
  } catch (err) {
    console.log(err);
  }
};

export const getMemberBySearch = async (req, res) => {
  try {
    const keySearch = req.query.keySearch || "";
    if (keySearch === "") {
      return res.status(200).json([]); // Tidak menampilkan apa pun
    }
    const safeKeySearch = keySearch.replace(/[%_]/g, "\\$&"); // Escape karakter SQL

    const result = await Member.findAll({
      where: {
        [Op.or]: [
          { pembeli: { [Op.like]: `%${safeKeySearch}%` } }, // LIKE namaProduk
          { noMember: { [Op.like]: `%${safeKeySearch}%` } }, // LIKE merek
          { alamat: { [Op.like]: `%${safeKeySearch}%` } }, // LIKE merek
        ],
      },
      order: [["createdAt", "ASC"]],
    });
    if (!result || !Array.isArray(result)) {
      return res.status(404).json({ message: "Barang tidak ditemukan", data: [] });
    }
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const createMember = async (req, res) => {
  try {
    const { noMember, pembeli, alamat } = req.body;

    const rawMember = await Member.findOne({
      where: { pembeli, alamat },
    });
    // cek stok barang
    if (rawMember) {
      return res.status(409).json({ message: "Member Sudah Terdaftar" });
    }

    const crtMember = await Member.create({
      noMember,
      pembeli,
      alamat,
    });

    res.json(crtMember);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteMember = async (req, res) => {
  const id = req.params.id;
  try {
    const response = await Member.destroy({
      where: {
        id: id,
      },
    });
    res.json({ msg: "Data berhasil dihapus" });
  } catch (error) {
    res.json({ msg: "Data Gagal dihapus" });
  }
};
