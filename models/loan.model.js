import { DataTypes } from "sequelize";
import connection from "#config/db";

const Loan = connection.define("loan", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  id_student: {
    type: DataTypes.INTEGER,
  },
  id_employee: {
    type: DataTypes.INTEGER,
  },
  loan_date: {
    type: DataTypes.DATE,
  },
  return_date: {
    type: DataTypes.DATE,
  },
  created_at: {
    type: DataTypes.DATE,
  },
  updated_at: {
    type: DataTypes.DATE,
  },
});

export default Loan;
