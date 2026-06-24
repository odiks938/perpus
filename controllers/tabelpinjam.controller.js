import tabelpinjam from "../models/tabelpinjam.model.js";

const getAll = async (_, res) => {
  try {
    const data = await tabelpinjam.findAll();

    res.json({
      data: data,
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
    await tabelpinjam.create(req.body);

    res.status(201).json({
      message: "tabelpinjam saved successfully",
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
    const result = await tabelpinjam.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (result[0] === 0) {
      return res.status(404).json({
        message: "Cannot find the specified ID",
      });
    }

    res.json({
      message: "tabelpinjam updated successfully",
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
    const result = await tabelpinjam.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (result === 0) {
      return res.status(404).json({
        message: "Cannot find the specified ID",
      });
    }

    res.json({
      message: "tabelpinjam deleted successfully",
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
    const data = await tabelpinjam.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!data) {
      return res.status(404).json({
        message: "Not found",
      });
    }

    res.json({
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: error.message,
    });
  }
};

export default { getAll, add, update, destroy, findById };