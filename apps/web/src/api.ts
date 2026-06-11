import type { Book } from '@bookshelf/shared'

const BASE = '/api/books'

export async function getBooks(): Promise<Book[]> {
  const res = await fetch(BASE)
  if (!res.ok) throw new Error('Failed to fetch books')
  return res.json()
}

export async function searchBooks(q: string): Promise<Book[]> {
  const res = await fetch(`${BASE}/search?q=${encodeURIComponent(q)}`)
  if (!res.ok) throw new Error('Failed to search books')
  return res.json()
}
