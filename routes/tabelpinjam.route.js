import express from "express";
import tabelpinjam from "../controllers/tabelpinjam.controller.js";

const router = express.Router();
router.get("/", tabelpinjam.getAll);
router.get("/:id", tabelpinjam.findById);
router.post("/", tabelpinjam.add);
router.patch("/:id", tabelpinjam.update);
router.delete("/:id", tabelpinjam.destroy);

export default router;
