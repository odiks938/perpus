import express from "express";
import cors from "cors";

import connection from "./config/db.config.js";

import bookRouter from "./routes/book.route.js";
import departementRouter from "./routes/departement.route.js";
import studentRouter from "./routes/student.route.js";
import loanRouter from "./routes/loan.route.js";


const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route utama
app.get("/", (req, res) => {
  res.status(200).json({
    message: "API Perpustakaan Berjalan",
  });
});

// API Routes
app.use("/api/buku", bookRouter);
app.use("/api/kampus", departementRouter);
app.use("/api/siswa", studentRouter);
app.use("/api/pinjam", loanRouter);
app.use("/api/prodi"), studentRouter;
// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    message: "API Endpoint Not Found",
    error: "Not Found",
  });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
    error: "Internal Server Error",
  });
});

// Koneksi Database
(async () => {
  try {
    await connection.authenticate();
    console.log("✅ Database connected!");

    await connection.sync();
    console.log("✅ Database synced!");
  } catch (err) {
    console.error("❌ Failed to connect database:", err);
  }
})();

// Localhost
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

// Untuk Vercel
export default app;
