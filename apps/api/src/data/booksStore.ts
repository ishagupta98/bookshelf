import fs from "fs";
import path from "path";
import { Book } from "@bookshelf/shared";

const DATA_FILE = path.resolve(__dirname, "../../data/books.json");

function readAll(): Book[] {
  const raw = fs.readFileSync(DATA_FILE, "utf-8");
  return JSON.parse(raw) as Book[];
}

function writeAll(books: Book[]): void {
  fs.writeFileSync(DATA_FILE, JSON.stringify(books, null, 2), "utf-8");
}

export const booksStore = {
  getAll(): Book[] {
    return readAll();
  },

  getById(id: string): Book | undefined {
    return readAll().find((b) => b.id === id);
  },

  create(book: Book): Book {
    const books = readAll();
    books.push(book);
    writeAll(books);
    return book;
  },

  search(query: string): Book[] {
    const q = query.toLowerCase();
    return readAll().filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.genre.toLowerCase().includes(q)
    );
  },

  delete(id: string): boolean {
    const books = readAll();
    const filtered = books.filter((b) => b.id !== id);
    if (filtered.length === books.length) return false;
    writeAll(filtered);
    return true;
  },
};
