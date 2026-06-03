import { Student, Departement, Loan, DetailLoan, Book } from "#models";

// TODO: /api/student/:id/loan -> Ambil semua peminjaman dengan id student :id

const getAll = async (_, res) => {
  try {
    const departement = await Student.findAll({ include: Departement });
    res.json({
      data: departement,
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: error.message,
    });
  }
};

const getAllLoan = async (req, res) => {
  try {
    const student = await Student.findAll({
      attributes: ["name"],
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Loan,
          as: "loans",
          attributes: ["loan_date"],
          include: [
            {
              model: DetailLoan,
              as: "detail_loans",
              where: { status: "loaned" },
              attributes: ["status", "loan_qty"],
              include: [
                {
                  model: Book,
                  as: "book",
                  attributes: ["title"],
                },
              ],
            },
          ],
        },
      ],
    });

    res.json({
      data: student,
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
    await Student.create(req.body);
    res.status(201).json({
      message: "Student saved successfully",
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
    const book = await Student.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (book.length === 0) {
      res.status(404).json({ message: "Cannot find the specified ID" });
    }
    res.json({
      message: "Student updated successfully",
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
    const departement = await Student.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (departement.length === 0) {
      res.status(404).json({ message: "Cannot find the specified ID" });
    }
    res.json({
      message: "Student deleted successfully",
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
    const departement = await Student.findAll({
      where: {
        id: req.params.id,
      },
    });
    if (departement.length === 0) {
      res.status(404).json({ message: "Not found" });
    }
    res.json({
      data: departement[0],
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: error.message,
    });
  }
};

export default { getAll, add, update, destroy, findById, getAllLoan };
