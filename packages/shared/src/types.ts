export type Shelf = "want-to-read" | "reading" | "read";

export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  shelf: Shelf;
  rating: number | null; // 1–5, null if unrated
  review: string | null;
  createdAt: string; // ISO 8601
}

export type CreateBookInput = Omit<Book, "id" | "createdAt">;

export type UpdateBookInput = Partial<Omit<Book, "id" | "createdAt">>;

export interface ApiError {
  error: string;
}
