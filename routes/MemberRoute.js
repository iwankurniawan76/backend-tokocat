import express from "express";
import { getMemberBySearch, createMember, getAllMember, deleteMember } from "../controller/MemberController.js";

const router = express.Router();

// router.get("/users", verifiyToken, getUser);
router.get("/members", getAllMember);
router.get("/members/search", getMemberBySearch);
router.post("/member", createMember);
router.delete("/member/:id", deleteMember);

export default router;
