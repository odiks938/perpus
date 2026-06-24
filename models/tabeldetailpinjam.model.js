import { DataTypes } from "sequelize";
import connection from "../config/db.config.js";
import tabelpinjam from "./tabelpinjam.model.js";

const tabeldetailpinjam = connection.define(
  "tabeldetailpinjam",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    pinjam_id: {
      type: DataTypes.INTEGER,
    },
    buku_id: {
      type: DataTypes.INTEGER,
    },
    jumlah_pinjam: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.STRING,
    },
    created_at: {
      type: DataTypes.DATE,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "tabeldetailpinjam",
    timestamps: false,
  }
);

// relasi
tabelpinjam.hasMany(tabeldetailpinjam, { foreignKey: "id" });
tabeldetailpinjam.belongsTo(tabelpinjam, { foreignKey: "id" });

export default tabeldetailpinjam;