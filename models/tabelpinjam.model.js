import { DataTypes } from "sequelize";
import connection from "../config/db.config.js";

const tabelpinjam= connection.define("tabelpinjam", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    tanggal_pinjam: {
      type: DataTypes.DATE,
    },
    tanggal_kembali: {
      type: DataTypes.DATE,
    },
    nim: {
      type: DataTypes.INTEGER,
    },
    pegawai_id: {
      type: DataTypes.INTEGER,
    },
    created_at: {
      type: DataTypes.DATE,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "tabelpinjam",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default tabelpinjam;