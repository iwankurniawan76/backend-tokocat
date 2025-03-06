import express from "express";
import fileupload from "express-fileupload";
import cors from "cors";
import cookieParser from "cookie-parser";
import db from "./config/Database.js";
import ProdukRoute from "./routes/ProdukRoute.js";
import Penjualan from "./model/PenjualanModel.js";
import UserRoute from "./routes/UserRoute.js";
import MemberRoute from "./routes/MemberRoute.js";
import UsersAuth from "./model/UserModel.js";
import Produk from "./model/ProdukModel.js";
import Member from "./model/MemberModel.js";
import PenjualanRoute from "./routes/PenjualanRoute.js";

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(
  "/uploads",
  express.static("public/uploads", {
    setHeaders: (res, path, stat) => {
      res.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    },
  })
);
app.use(UserRoute);
app.use(fileupload());
app.use(express.urlencoded({ extended: true }));
app.use(ProdukRoute);
app.use(PenjualanRoute);
app.use(MemberRoute);

//info database terkoneksi
try {
  await db.authenticate();
  console.log("Database Connected...");
  await UsersAuth.sync();
} catch (err) {
  console.error(err);
  console.log("Databased tidak terhubung !!");
}
// info server running
app.listen(5500, () => console.log("server running port 5500"));
