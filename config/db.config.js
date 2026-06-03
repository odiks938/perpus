import { Sequelize } from "sequelize";

const connection = new Sequelize("perpustakaan", "root", "", {
  host: "localhost",
  dialect: "mysql",
  define: {
    timestamps: false,
    freezeTableName: true,
  },
});

// connection.sync({ alter: true, force: true });

export default connection;
