import express from "express";
import user from "../controllers/user.controller.js";

const router = express.Router();
router.post("/", User.register);
router.post("/login", User.login);

export default router;
