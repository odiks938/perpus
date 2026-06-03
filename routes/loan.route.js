import express from "express";
import Loan from "#controllers/loan";

const router = express.Router();

router.get("/", Loan.getAll);
router.get("/returned", Loan.getAllReturn);
router.get("/loaned", Loan.getAllLoan);
router.get("/:id", Loan.findById);
router.get("/returned/:id", Loan.getReturnWithID);
router.get("/loaned/:id", Loan.getLoanWithID);

router.post("/", Loan.add);

router.patch("/:id", Loan.update);
router.patch("/:id/return", Loan.returnBook);

router.delete("/:id", Loan.destroy);

export default router;
