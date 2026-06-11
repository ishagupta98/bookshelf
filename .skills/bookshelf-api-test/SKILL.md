---
name: bookshelf-api-test
description: Use this skill when testing BookShelf API endpoints — starting the server and exercising the /api/books routes.
---

# BookShelf API Test Skill

Use this skill when testing BookShelf API endpoints.

## Steps

1. Start backend server:
```bash
cd apps/api
npm run dev
```
The API listens on http://localhost:3001.

2. List all books:
```bash
curl http://localhost:3001/api/books
```

3. Search books (title, author, genre — case-insensitive):
```bash
curl "http://localhost:3001/api/books/search?q=tolkien"
```

4. Get a single book by id (404 if not found):
```bash
curl http://localhost:3001/api/books/<id>
```

5. Create a book (title, author, genre, shelf required; returns 201):
```bash
curl -X POST http://localhost:3001/api/books \
  -H "Content-Type: application/json" \
  -d '{"title":"The Hobbit","author":"J.R.R. Tolkien","genre":"Fantasy","shelf":"want-to-read"}'
```

## Expected Responses
- Success (list):   `Book[]`
- Success (single): `Book`
- Created:          `Book` with status 201
- No content:       status 204 (DELETE)
- Not found:        `{ "error": "Book not found" }` with status 404
- Bad request:      `{ "error": "<reason>" }` with status 400
- Server error:     `{ "error": "Internal server error" }` with status 500
