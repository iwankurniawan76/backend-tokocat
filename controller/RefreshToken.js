import UsersAuth from "../model/UserModel.js";
import jwt from "jsonwebtoken";

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) return res.status(401).json({ message: "token tidak ada" });
    const user = await UsersAuth.findAll({
      where: {
        refresh_token: refreshToken,
      },
    });
    if (!user[0]) return res.sendStatus(403);
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) return res.sendStatus(403);
      const fotoProfil = user[0].fotoProfil;
      const userId = user[0].id;
      const nama = user[0].nama;
      const status = user[0].status;
      const accessToken = jwt.sign({ userId, nama, status, fotoProfil }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "20s",
      });
      res.json(accessToken);
    });
  } catch (err) {
    console.log(err);
  }
};
