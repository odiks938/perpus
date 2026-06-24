import express from "express";
import user from "../controllers/user.controller.js";

const router = express.Router();
router.post("/", register);
router.post("/login", login);

export default router;
