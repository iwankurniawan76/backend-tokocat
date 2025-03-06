import UserAuth from "../model/UserModel.js";
import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// 🔹 Controller Update Profil (Foto & Password)
export const updateProfile = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "File tidak ditemukan!" });
  }

  try {
    const id = req.params.id;
    const { nama, status } = req.body;
    const fotoProfil = `/uploads/${req.file.filename}`;

    const user = await UserAuth.findByPk(id);
    if (!user) return res.status(404).json({ message: "User tidak ditemukan" });

    await UserAuth.update(
      { nama, status, fotoProfil },
      {
        where: { id }, // ✅ Pastikan ada where!
      }
    );

    return res.json({ message: "Profil berhasil diperbarui!", fotoProfil });
  } catch (error) {
    console.error("❌ Error:", error.message);
    return res.status(500).json({ message: "Gagal memperbarui profil", error: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await UserAuth.findAll({
      attributes: ["id", "nama", "status"],
    });
    return res.json(user);
  } catch (err) {
    console.log(err);
  }
};

export const Register = async (req, res) => {
  console.log("mulaiii");
  const { nama, status, password, confirmPassword } = req.body;
  if (password !== confirmPassword) return res.status(400).json({ message: " Password dan confPassword tidak cocok" });
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  // simpan ke databased
  try {
    const user = await UserAuth.findOne({
      where: {
        nama: req.body.nama,
      },
    });
    if (user) {
      res.status(400).json({ message: "user sudah terdaftar" });
    }
    await UserAuth.create({
      nama: nama,
      status: status,
      password: hashPassword,
    });
    return res.json({ msg: "Register berhasil" });
  } catch (err) {
    console.log(err);
  }
};

export const Login = async (req, res) => {
  try {
    const user = await UserAuth.findAll({
      where: {
        nama: req.body.nama,
      },
    });
    const match = await bcrypt.compare(req.body.password, user[0].password);
    if (!match) return res.status(400).json({ message: "Password tidak sesuai" });
    const fotoProfil = user[0].fotoProfil;
    const userId = user[0].id;
    const nama = user[0].nama;
    const status = user[0].status;
    const accesToken = jwt.sign({ userId, nama, status, fotoProfil }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "20s",
    });
    const refreshToken = jwt.sign({ userId, nama, status, fotoProfil }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "1d",
    });
    // UPDATE REFRESH TOKEN DI DATABASED
    await UserAuth.update(
      {
        refresh_token: refreshToken,
      },
      {
        where: {
          id: userId,
        },
      }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accesToken });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Email tidak ditemukan" });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    await UserAuth.destroy({
      where: {
        id: id,
      },
    });
    res.json({ msg: "Data berhasil dihapus" });
  } catch (error) {
    res.json({ msg: "Data Gagal dihapus" });
  }
};

export const Logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(204);
    const user = await UserAuth.findAll({
      where: {
        refresh_token: refreshToken,
      },
    });
    if (!user[0]) return res.sendStatus(204);
    const userId = user[0].id;
    console.log(userId);
    await UserAuth.update(
      { refresh_token: null },
      {
        where: {
          id: userId,
        },
      }
    );
    res.clearCookie("refreshToken");
    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
  }
};

export const ubahPassword = async (req, res) => {
  try {
    const id = req.params.id;
    const { passwordLama, passwordBaru } = req.body;
    // Cari user berdasarkan ID dari token
    const user = await UserAuth.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan." });
    }

    // Verifikasi password lama
    const isMatch = await bcrypt.compare(passwordLama, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Password lama salah." });
    }

    // Hash password baru dan update
    const hashedPassword = await bcrypt.hash(passwordBaru, 10);
    await user.update({ password: hashedPassword });

    res.json({ message: "Password berhasil diubah." });
  } catch (err) {
    console.log(err);
    res.json({ message: "Password gagal diubah." });
  }
};
