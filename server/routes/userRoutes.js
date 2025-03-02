import express from "express";
import { registerUser, loginUser } from "../controllers/userController.js";

const router = express.Router();

// ✅ API Routes
router.post("/", registerUser); // ✅ Correct route for registration
router.post("/login", loginUser); // ✅ Correct route for login

export default router;
