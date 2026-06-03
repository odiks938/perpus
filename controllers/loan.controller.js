import { Book, DetailLoan, Loan, Student } from "#models";

const getAll = async (_, res) => {
  try {
    const loan = await Loan.findAll({
      include: [
        {
          model: DetailLoan,
          as: "detail_loans",
          include: [{ model: Book, attributes: ["title"] }],
        },
        { model: Student, as: "student", attributes: ["name"] },
      ],
    });
    // console.log(loan[1].dataValues);
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

const getAllReturn = async (req, res) => {
  try {
    const loan = await Loan.findAll({
      include: [
        {
          model: DetailLoan,
          as: "detail_loans",
          attributes: ["id", "id_book", "loan_qty", "status", "updated_at"],
          include: [{ model: Book, attributes: ["title"] }],
          where: {
            status: "returned",
          },
        },
        { model: Student, as: "student", attributes: ["name"] },
      ],
    });
    const tmp_loans = JSON.parse(JSON.stringify(loan));
    const tmp_loan = tmp_loans.map((item) => {
      item.detail_loans.forEach((detail) => {
        const return_date = new Date(item.return_date);
        const updated_at = new Date(detail.updated_at);

        const diffDateMath = updated_at - return_date;
        const diffInDays = Math.floor(diffDateMath / (1000 * 60 * 60 * 24));
        console.log(diffInDays);

        Object.assign(detail, {
          terlambat: diffInDays,
        });
      });
      return item;
    });

    res.json({
      data: tmp_loan,
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: error.message,
    });
  }
};

const getAllLoan = async (_, res) => {
  try {
    const loan = await Loan.findAll({
      include: [
        {
          model: DetailLoan,
          as: "detail_loans",
          include: [{ model: Book, attributes: ["title"] }],
          where: {
            status: "loaned",
          },
        },
        { model: Student, as: "student", attributes: ["name"] },
      ],
    });
    // console.log(loan[1].dataValues);
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

const getReturnWithID = async (req, res) => {
  try {
    const loan = await Loan.findAll({
      include: [
        {
          model: DetailLoan,
          as: "detail_loans",
          include: [{ model: Book, attributes: ["title"] }],
          where: {
            status: "returned",
          },
        },
        { model: Student, as: "student", attributes: ["name"] },
      ],
      where: {
        id: req.params.id,
      },
    });
    // console.log(loan[1].dataValues);
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

const getLoanWithID = async (req, res) => {
  try {
    const loan = await Loan.findAll({
      include: [
        {
          model: DetailLoan,
          as: "detail_loans",
          include: [{ model: Book, attributes: ["title"] }],
          where: {
            status: "loaned",
          },
        },
        { model: Student, as: "student", attributes: ["name"] },
      ],
      where: {
        id: req.params.id,
      },
    });
    // console.log(loan[1].dataValues);
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
    const today = new Date();
    today.setDate(today.getDate() + 7);
    req.body.return_date = today;
    // NOTE: Expected req.body
    //     {
    //     "id_student": 5,
    //     "id_employee": 1,
    //     "books": [
    //         {
    //             "id": 1,
    //             "qty": 1
    //         }
    //      ]
    //    }
    //  Expected request body -> {..., books: [{id: book_id1, qty: int}, {id: book_id2, qty: int}]}
    const loan = await Loan.create(req.body);
    const loan_id = loan.id;
    if (req.body.books.length == 0) {
      res.status(400);
      res.json({ message: "Expected books inputed" });
      return;
    }
    req.body.books.forEach(async (book) => {
      // Bagaimana cara untuk mengurangi qty di table book?
      // Kita panggil dulu data yang ada di table book
      const bookQuery = await Book.findOne({
        where: {
          id_book: book.id,
        },
      });

      // Kita ambil qty
      // Kita kurangi dengan qty yang user mau pinjam
      // Gimana kalau misalnya kurang? -> Kita kasih pesan error
      if (bookQuery.quantity - book.qty  < 0) {
        res
          .status(422)
          .json({ message: "Sorry, the requested book not that much" });
        return;
      }

      // Jika tidak kita update quantitynya langsung
      bookQuery.quantity = bookQuery.quantity - book.qty;
      bookQuery.save();

      await DetailLoan.create({
        id_loan: loan_id,
        id_book: book.id,
        loan_qty: book.qty,
        status: "loaned",
      });
    });
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
  // Optional json request -> {..., books[new_book_id1, new_book_id2]}
  try {
    const loan = await Loan.update(req.body, {
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
    const loan = await Loan.destroy({
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
    const loan = await Loan.findAll({
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

// Fungsi untuk mengembalikan buku
// Ada dua kemungkinan kasus
// 1. Pengembalian seluruh buku
// 2. Pengembalian sebagian buku

// Expected Input: Sebuah array buku yang hendak dikembalikan dan qty yang hendak
//                 dikembalikan
// {
//  "books": [
//      {
//        "id_book": ":int",  -> required
//        "qty": ":int" -> not required
//      }
//   ]
// }
//
// Expected URL: /api/loan/:id/return

// NOTE:
// Jika di qty ada dan berisi nilai yang valid, maka dikembalikan sesuai jumlah buku yang tertera
// Jika tidak, maka dianggap mengembalikan semuanya
// Nilai yang valid itu, 0 < n <= qty_loan

const returnBook = async (req, res) => {
  try {
    const id_loan = req.params.id;
    const { books } = req.body;
    // Cek inputed request dulu
    // -> id_loan harus ada di database
    const loan = await Loan.findOne({
      where: {
        id: id_loan,
      },
      include: {
        model: DetailLoan,
      },
    });

    // -> id_buku harus ada di detail_loans
    // -> validasi nilai qty, 0 < n <= qty_loan
    const detail_loans = loan.detail_loans;
    const isValidQuantityIDBook = books.every((book) => {
      let status = true;
      let detail = detail_loans.find(
        (detail) => book.id_book == detail.id_book,
      );

      if (detail === undefined) {
        status = false;
        return status;
      }
      const qty = book.qty ?? detail.loan_qty;
      if (!(detail.loan_qty >= qty && qty > 0)) {
        status = false;
      }
      return status;
    });

    if (!isValidQuantityIDBook) {
      res.json({ message: "There's an invalid value of id_book or qty!" });
      return;
    }

    books.forEach(async (book) => {
      let index = 0;
      let detail = loan.detail_loans.find((detail, i) => {
        let status = book.id_book == detail.id_book;
        if (status) index = i;
        return status;
      });

      // Jika buku yang dikembalikan semua atau tidak ada qty,
      // maka ubah baris status detail menjadi returned
      if (book.qty == detail.loan_qty) {
        await loan.detail_loans[index].set({ status: "returned" });
      } else {
        // Jika tidak, maka buat row baru dengan status loaned dan qty book.qty
        // Dan update data detail.loan_qty dengan detail.loan_qty - book.qty
        const new_qty = detail.loan_qty - book.qty;
        await loan.detail_loans[index].set({
          loan_qty: new_qty,
        });
        await DetailLoan.create({
          id_loan: id_loan,
          id_book: book.id_book,
          loan_qty: book.qty,
          status: "returned",
        });
      }

      await loan.detail_loans[index].save();
    });

    res.json({ message: "Success!" });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

export default {
  getAll,
  add,
  update,
  destroy,
  findById,
  returnBook,
  getAllReturn,
  getAllLoan,
  getReturnWithID,
  getLoanWithID,
};
