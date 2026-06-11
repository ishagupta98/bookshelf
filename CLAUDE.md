# BookShelf — AI Context File

## Project Overview
A simplified Goodreads clone. REST API + React frontend.
Monorepo: apps/api (Express + TypeScript) + apps/web (React) + packages/shared (types).
Data store: JSON files in /data/*.json — no database.

## Folder Structure
bookshelf/
├── apps/api/src/
│   ├── index.ts          — Express app entry point, port 3001
│   ├── routes/books.ts   — All book endpoints
│   └── data/booksStore.ts — JSON read/write functions
├── apps/api/data/
│   └── books.json        — Live data file
└── packages/shared/src/
    └── index.ts          — Shared TypeScript types (Book, CreateBookInput)

## Data Shape
Book object:
{
  id: string (uuid),
  title: string,
  author: string,
  genre: string,
  shelf: "want-to-read" | "reading" | "read",
  rating: number | null,
  review: string | null,
  createdAt: ISO8601 string
}

## API Conventions
Base URL: http://localhost:3001
All routes: /api/books

Response shapes:
- Success (list):   Book[]
- Success (single): Book
- Created:          Book with status 201
- No content:       status 204 (DELETE)
- Not found:        { error: "Book not found" } with status 404
- Bad request:      { error: "<reason>" } with status 400
- Server error:     { error: "Internal server error" } with status 500

## Data Access Layer (booksStore.ts)
Available functions:
- getAll(): Book[]
- getById(id: string): Book | undefined
- create(book: Book): Book
- search(q: string): Book[]  — searches title, author, genre (case-insensitive)

Important: JSON store has no concurrency handling.
All writes use getAll() + filter/map + write pattern.

## Existing Endpoints
GET    /api/books              — list all books
GET    /api/books/search?q=    — search title, author, genre
GET    /api/books/:id          — get one book (404 if not found)
POST   /api/books              — create book (title, author, genre, shelf required)
PUT    /api/books/:id          — update any field (404 if not found) — not yet implemented
PATCH  /api/books/:id/shelf    — update shelf only, validate enum — not yet implemented
DELETE /api/books/:id          — delete book (204 no content) — not yet implemented

## Code Style
- TypeScript strict mode
- Express Router pattern
- Error handling via next(err) for unexpected errors
- Explicit 404 checks before any update/delete
- All route handlers typed with Request, Response, NextFunction
- No async/await needed — JSON store is synchronous

## Constraints
- No database — all data in apps/api/data/books.json
- No auth — this is a learning project
- No Docker required
- Frontend (apps/web) not built yet — Day 2 onwards
