import Departement from "#models/departement";
import Student from "#models/student";
import Book from "#models/book";
import Loan from "#models/loan";
import DetailLoan from "#models/detail_loan";
import User from "#models/user";

Departement.hasMany(Student, { foreignKey: "id_departement" });
Student.belongsTo(Departement, { foreignKey: "id_departement" });

Student.hasMany(Loan, { foreignKey: "id_student" });
Loan.belongsTo(Student, { foreignKey: "id_student" });

Book.hasMany(DetailLoan, { foreignKey: "id_book" });
DetailLoan.belongsTo(Book, { foreignKey: "id_book" });

Loan.hasMany(DetailLoan, { foreignKey: "id_loan" });
DetailLoan.belongsTo(Loan, { foreignKey: "id_loan" });

export { Departement, Student, Book, Loan, DetailLoan, User };
