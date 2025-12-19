import express from "express";
import { Login, PrimeMember, Signup } from "../Controller/UserController.js";

const router = express.Router();

router.post("/signup", Signup);
router.post("/login", Login);
router.put("/primeMember", PrimeMember);

export default router;