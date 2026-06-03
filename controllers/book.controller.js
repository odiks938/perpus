import { Book } from "#models";

const getAll = async (_, res) => {
  try {
    const books = await Book.findAll();
    res.json({
      data: books,
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
    await Book.create(req.body);
    res.status(201).json({
      message: "Book saved successfully",
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
    const book = await Book.update(req.body, {
      where: {
        id_book: req.params.id,
      },
    });
    if (book.length === 0) {
      res.status(404).json({ message: "Cannot find the specified ID" });
    }
    res.json({
      message: "Book updated successfully",
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
    const book = await Book.destroy({
      where: {
        id_book: req.params.id,
      },
    });
    if (book.length === 0) {
      res.status(404).json({ message: "Cannot find the specified ID" });
    }
    res.json({
      message: "Book deleted successfully",
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
    const books = await Book.findAll({
      where: {
        id_book: req.params.id,
      },
    });
    if (books.length === 0) {
      res.status(404).json({ message: "Not found" });
    }
    res.json({
      data: books[0],
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: error.message,
    });
  }
};

export default { getAll, add, update, destroy, findById };
