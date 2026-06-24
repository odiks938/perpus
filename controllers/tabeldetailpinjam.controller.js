import tabeldetailpinjam from "../models/tabeldetailpinjam.model.js";
import tabelpinjam from "../models/tabelpinjam.model.js";

const getAll = async (_, res) => {
  try {
    const data = await tabeldetailpinjam.findAll({
      include: {
        model: tabelpinjam,
        attributes: [
          "id",
          "nim",
          "tanggal_pinjam",
          "tanggal_kembali",
          "pegawai_id",
          "created_at",
          "updated_at"],

      },
    });

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
    await tabeldetailpinjam.create(req.body);
    res.status(201).json({
      message: "tabeldetailpinjam saved successfully",
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
    const result = await tabeldetailpinjam.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (result[0] === 0) {
      return res.status(404).json({ message: "Cannot find the specified ID" });
    }

    res.json({
      message: "tabeldetailpinjam updated successfully",
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
    const result = await tabeldetailpinjam.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (result === 0) {
      return res.status(404).json({ message: "Cannot find the specified ID" });
    }

    res.json({
      message: "tabeldetailpinjam deleted successfully",
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
    const data = await tabeldetailpinjam.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!data) {
      return res.status(404).json({ message: "Not found" });
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