import express from "express";
import { getUser, Register, Login, Logout, deleteUser, ubahPassword, updateProfile } from "../controller/UserController.js";
import { verifiyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controller/RefreshToken.js";
import upload from "../middleware/Upload.js";

const router = express.Router();

// router.get("/users", verifiyToken, getUser);
router.get("/users", getUser);
router.post("/user", Register);
router.post("/login", Login);
router.get("/token", refreshToken);
router.delete("/logout", Logout);
router.delete("/user/:id", deleteUser);
router.put("/user/:id", ubahPassword);
router.put("/user/profile/:id", upload, updateProfile);

export default router;
