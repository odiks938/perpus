import express from "express";
import Departement from "../controllers/departement.controller.js";

const router = express.Router();
router.get("/", Departement.getAll);
router.get("/:id", Departement.findById);
router.post("/", Departement.add);
router.patch("/:id", Departement.update);
router.delete("/:id", Departement.destroy);

export default router;
