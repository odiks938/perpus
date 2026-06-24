import { DataTypes } from "sequelize";
import connection from "../config/db.config.js";

const Departement = connection.define("prodi", {
  kode_prodi: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nama_prodi: {
    type: DataTypes.STRING,
  },
  singkatan: {
    type: DataTypes.STRING,
  },
  created_at: {
    type: DataTypes.DATE,
  },
  updated_at: {
    type: DataTypes.DATE,
  },
});

export default Departement;
