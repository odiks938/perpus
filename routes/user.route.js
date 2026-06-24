import express from "express";
import user from "../controllers/user.controller.js";

const router = express.Router();
router.post("/", user.register);
router.post("/login", user.login);

export default router;
