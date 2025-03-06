import expres from "express";
import {
  getProduk,
  getProdukById,
  saveProduk,
  updateProduk,
  deleteProduk,
  bayar,
} from "../controller/ProdukController.js";
import { verifiyToken } from "../middleware/VerifyToken.js";

const router = expres.Router();

router.get("/produks", getProduk);
router.get("/produk/:id", getProdukById);
router.post("/produk", saveProduk);
router.put("/produk/:editId", updateProduk);
router.put("/produks/:id", bayar);
router.delete("/produk/:id", deleteProduk);

export default router;
