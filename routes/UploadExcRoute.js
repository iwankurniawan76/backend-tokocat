import expres from "express";
import { uplExcel } from "../controller/UploadExcController.js";

const router = expres.Router();

router.post("/upload_excel", uplExcel);

export default router;
