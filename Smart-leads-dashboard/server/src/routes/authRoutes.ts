import express from "express";
import { registerUser, loginUser } from "../controllers/authController";

const router = express.Router();

router.post("/register", registerUser);

// ✅ FIXED: use controller (BEST PRACTICE)
router.post("/login", loginUser);

export default router;