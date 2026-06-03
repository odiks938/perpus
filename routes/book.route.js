import express from "express";
import Book from "../controllers/book.controller.js";

const router = express.Router();
router.get("/", Book.getAll);
router.get("/:id", Book.findById);
router.post("/", Book.add);
router.patch("/:id", Book.update);
router.delete("/:id", Book.destroy);

export default router;
