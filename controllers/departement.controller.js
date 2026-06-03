import { Departement, Student } from "#models";

const getAll = async (_, res) => {
  try {
    const departement = await Departement.findAll({
      include: Student,
    });
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

const add = async (req, res) => {
  try {
    await Departement.create(req.body);
    res.status(201).json({
      message: "Departement saved successfully",
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
    const departement = await Departement.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (departement.length === 0) {
      res.status(404).json({ message: "Cannot find the specified ID" });
    }
    res.json({
      message: "Departement updated successfully",
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
    const departement = await Departement.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (departement.length === 0) {
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
    const departement = await Departement.findAll({
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

export default { getAll, add, update, destroy, findById };
