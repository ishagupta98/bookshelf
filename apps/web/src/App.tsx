import { useEffect, useState } from 'react'
import type { Book } from '@bookshelf/shared'
import { getBooks, searchBooks } from './api'

function App() {
  const [books, setBooks] = useState<Book[]>([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    const request = query.trim() ? searchBooks(query.trim()) : getBooks()
    request
      .then(setBooks)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false))
  }, [query])

  return (
    <div>
      <h1>BookShelf</h1>
      <input
        type="text"
        placeholder="Search by title, author, or genre…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {loading && <p>Loading…</p>}
      {error && <p>Error: {error}</p>}

      {!loading && !error && books.length === 0 && <p>No books found.</p>}

      {!loading && !error && books.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th>Shelf</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.genre}</td>
                <td>{book.shelf}</td>
                <td>{book.rating ?? '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default App
