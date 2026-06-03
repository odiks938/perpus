import { DataTypes } from "sequelize";
import connection from "#config/db";

const Book = connection.define("book", {
  id_book: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
  },
  quantity: {
    type: DataTypes.INTEGER,
  },
  year_published: {
    type: DataTypes.INTEGER,
  },
  id_author: {
    type: DataTypes.INTEGER,
  },
  id_publisher: {
    type: DataTypes.INTEGER,
  },
  code_shelf: {
    type: DataTypes.INTEGER,
  },
  created_at: {
    type: DataTypes.DATE,
  },
  updated_at: {
    type: DataTypes.DATE,
  },
});

export default Book;
