import { DetailLoan, Student } from "#models";
// TODO: Lakukan pembaruan pada add, update, dan delete agar langsung terhubung pada loan
const getAll = async (_, res) => {
  try {
    const loan = await DetailLoan.findAll({ include: Student });
    res.json({
      data: loan,
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: error.message,
    });
  }
};

const add = async (req, res) => {
  try {
    await DetailLoan.create(req.body);
    res.status(201).json({
      message: "Loan saved successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: error.message,
    });
  }
};

const update = async (req, res) => {
  try {
    const loan = await DetailLoan.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (loan.length === 0) {
      res.status(404).json({ message: "Cannot find the specified ID" });
    }
    res.json({
      message: "Loan updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: error.message,
    });
  }
};

const destroy = async (req, res) => {
  try {
    const loan = await DetailLoan.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (loan.length === 0) {
      res.status(404).json({ message: "Cannot find the specified ID" });
    }
    res.json({
      message: "Loan deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: error.message,
    });
  }
};

const findById = async (req, res) => {
  try {
    const loan = await DetailLoan.findAll({
      where: {
        id: req.params.id,
      },
    });
    if (loan.length === 0) {
      res.status(404).json({ message: "Not found" });
    }
    res.json({
      data: loan[0],
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: error.message,
    });
  }
};

export default { getAll, add, update, destroy, findById };
