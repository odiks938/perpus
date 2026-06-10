import express from "express";
import connection from "#config/db";
import bookRouter from "#routes/book";
import departementRouter from "#routes/departement";
import studentRouter from "#routes/student";
import loanRouter from "#routes/loan";
import cors from "cors";

const app = express();
try {
  await connection.authenticate();
  console.log("Database connected!");

  await db.sync();
  console.log ("Database synced");
} catch (err) {
  console.log("Failed to connect to database", err);
}



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/buku", bookRouter);
app.use("/api/kampus", departementRouter);
app.use("/api/siswa", studentRouter);
app.use("/api/pinjam", loanRouter);
app.use((_, res) => {
  res.status(404).json({
    message: "API Endpoint Not Found",
    error: "Not Found",
  });
});
app.use((err, _, res, next) => {
  if (!err.status) err.status = 500;
  res.status(err.status).json({
    status: 500,
    message: err.message,
    erro: "Internal Server Error",
  });
});

app.listen(5000);



/** 
 * pinjam
 * {
    "id_student": 5, (id_loan)
    "id_employee": 1,
    "books": [
        {
            "id": 1, (books)
            "qty": 1 (yg mau di pinjam)
        }
    ]
}
 * 
 * pengembalian
 * {
   "books":[
    {
        "id_book": 1,
        "qty": 1 (yg mau dikembalikan)
    }
   ]
}
 */
