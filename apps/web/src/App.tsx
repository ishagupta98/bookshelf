import { useEffect, useState, useRef } from 'react'
import type { Book } from '@bookshelf/shared'
import { getBooks, searchBooks } from './api'
import SearchBar from './components/SearchBar'
import BookGrid from './components/BookGrid'
import LoadingGrid from './components/LoadingGrid'
import EmptyState from './components/EmptyState'

export default function App() {
  const [books, setBooks] = useState<Book[]>([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      setLoading(true)
      setError(null)
      const request = query.trim() ? searchBooks(query.trim()) : getBooks()
      request
        .then(setBooks)
        .catch((err: Error) => setError(err.message))
        .finally(() => setLoading(false))
    }, 300)
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [query])

  return (
    <div className="min-h-screen bg-warm-white">
      {/* Header */}
      <header className="bg-navy text-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 flex items-center gap-3">
          <span className="text-2xl select-none">📖</span>
          <h1 className="text-xl font-bold tracking-tight">BookShelf</h1>
          <span className="ml-auto text-xs text-white/40 font-medium hidden sm:block">
            Your personal reading tracker
          </span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-8">
        {/* Search */}
        <SearchBar value={query} onChange={setQuery} />

        {/* Results count */}
        {!loading && !error && books.length > 0 && (
          <p className="text-sm text-navy/50 -mt-4">
            {books.length} {books.length === 1 ? 'book' : 'books'} found
          </p>
        )}

        {/* Content */}
        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {!error && loading && <LoadingGrid />}

        {!error && !loading && books.length === 0 && (
          <EmptyState query={query} />
        )}

        {!error && !loading && books.length > 0 && (
          <BookGrid books={books} />
        )}
      </main>
    </div>
  )
}
