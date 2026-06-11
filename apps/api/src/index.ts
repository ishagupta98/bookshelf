import express from "express";
import booksRouter from "./routes/books";

const app = express();
const PORT = process.env.PORT ?? 3001;

app.use(express.json());

app.use("/api/books", booksRouter);

// 404 handler for unknown routes
app.use((_req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Global error handler
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`BookShelf API running on http://localhost:${PORT}`);
});
