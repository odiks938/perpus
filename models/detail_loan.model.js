import { DataTypes } from "sequelize";
import connection from "#config/db";

const DetailLoan = connection.define("detail_loan", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  id_loan: {
    type: DataTypes.INTEGER,
  },
  id_book: {
    type: DataTypes.INTEGER,
  },
  loan_qty: {
    type: DataTypes.INTEGER,
  },
  status: {
    type: DataTypes.ENUM("returned", "loaned"),
  },
  created_at: {
    type: DataTypes.DATE,
  },
  updated_at: {
    type: DataTypes.DATE,
  },
});

export default DetailLoan;
