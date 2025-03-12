import expres from "express";
import { getAllPenjualan, getBySearch, createPenjualan, deletePenjualan, getByDate } from "../controller/PenjualanController.js";

const router = expres.Router();

router.post("/penjualan", createPenjualan);
router.get("/penjualan", getAllPenjualan);
router.get("/penjualan/search", getBySearch);
router.get("/penjualan/:startDate/:endDate", getByDate);
router.delete("/penjualan/:noPenjualan", deletePenjualan);

export default router;
