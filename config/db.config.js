import { Sequelize } from "sequelize";
import mysql2 from 'mysql2'; 

const connection = new Sequelize("perpustakaan","avnadmin", "AVNS_pLsDhbrGquiGDv2n7Ao", {
  host: "mysql-239e893f-odiks938-1538.h.aivencloud.com",
  dialect: "mysql",
  port: 19223, 
  dialectOptions: {
     ssl: { rejectUnauthorized: false 

     } }, 
  define: {
    timestamps: false,
    freezeTableName: true,
  },
});

// connection.sync({ alter: true, force: true });

export default connection;
