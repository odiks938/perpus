import express from "express";
import tabeldetailpinjam from "../controllers/tabeldetailpinjam.controller.js";

const router = express.Router();
router.get("/", tabeldetailpinjam .getAll);
router.get("/:id", tabeldetailpinjam .findById);
router.post("/",  tabeldetailpinjam.add);
router.patch("/:id",  tabeldetailpinjam.update);
router.delete("/:id", tabeldetailpinjam.destroy);

export default router;
