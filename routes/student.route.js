import express from "express";
import Student from "../controllers/student.controller.js";

const router = express.Router();
router.get("/", Student.getAll);
router.get("/:id", Student.findById);
router.get("/:id/loan", Student.getAllLoan);
router.post("/", Student.add);
router.patch("/:id", Student.update);
router.delete("/:id", Student.destroy);

export default router;
