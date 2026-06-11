import { Router, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { booksStore } from "../data/booksStore";
import { Book, CreateBookInput } from "@bookshelf/shared";

const router = Router();

// GET /api/books/search?q=  — must come before /:id to avoid route shadowing
router.get("/search", (req: Request, res: Response) => {
  const q = String(req.query.q ?? "").trim();
  if (!q) {
    res.status(400).json({ error: "Query parameter 'q' is required" });
    return;
  }
  res.json(booksStore.search(q));
});

// GET /api/books
router.get("/", (_req: Request, res: Response) => {
  res.json(booksStore.getAll());
});

// GET /api/books/:id
router.get("/:id", (req: Request, res: Response) => {
  const book = booksStore.getById(req.params.id);
  if (!book) {
    res.status(404).json({ error: "Book not found" });
    return;
  }
  res.json(book);
});

// POST /api/books
router.post("/", (req: Request, res: Response) => {
  const body = req.body as Partial<CreateBookInput>;

  const { title, author, genre, shelf } = body;
  if (!title || !author || !genre || !shelf) {
    res.status(400).json({ error: "title, author, genre, and shelf are required" });
    return;
  }

  const validShelves = ["want-to-read", "reading", "read"];
  if (!validShelves.includes(shelf)) {
    res.status(400).json({ error: `shelf must be one of: ${validShelves.join(", ")}` });
    return;
  }

  const rating = body.rating ?? null;
  if (rating !== null && (typeof rating !== "number" || rating < 1 || rating > 5)) {
    res.status(400).json({ error: "rating must be a number between 1 and 5" });
    return;
  }

  const book: Book = {
    id: uuidv4(),
    title,
    author,
    genre,
    shelf,
    rating,
    review: body.review ?? null,
    createdAt: new Date().toISOString(),
  };

  res.status(201).json(booksStore.create(book));
});

// DELETE /api/books/:id
router.delete("/:id", (req: Request, res: Response) => {
  const book = booksStore.getById(req.params.id);
  if (!book) {
    res.status(404).json({ error: "Book not found" });
    return;
  }
  booksStore.delete(req.params.id);
  res.status(204).send();
});

export default router;
