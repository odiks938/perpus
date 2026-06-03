import { DataTypes } from "sequelize";
import connection from "#config/db";

const Student = connection.define("student", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  birth_place: {
    type: DataTypes.STRING,
  },
  birth_date: {
    type: DataTypes.DATE,
  },
  id_departement: {
    type: DataTypes.INTEGER,
  },
  entry_year: { type: DataTypes.INTEGER },
  created_at: {
    type: DataTypes.DATE,
  },
  updated_at: {
    type: DataTypes.DATE,
  },
});

export default Student;
