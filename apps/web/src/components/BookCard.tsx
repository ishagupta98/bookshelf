import type { Book } from '@bookshelf/shared'

const SHELF_STYLES: Record<Book['shelf'], string> = {
  'want-to-read': 'bg-slate-100 text-slate-600',
  reading: 'bg-amber-100 text-amber-700',
  read: 'bg-green-100 text-green-700',
}

const SHELF_LABELS: Record<Book['shelf'], string> = {
  'want-to-read': 'Want to Read',
  reading: 'Reading',
  read: 'Read',
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 ${i < rating ? 'text-gold' : 'text-navy/15'}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118L10 14.347l-3.95 2.878c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.064 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.285-3.957z" />
        </svg>
      ))}
    </div>
  )
}

interface BookCardProps {
  book: Book
}

export default function BookCard({ book }: BookCardProps) {
  return (
    <article className="
      group bg-white rounded-2xl border border-navy/8 shadow-sm
      hover:-translate-y-1 hover:shadow-lg
      transition-all duration-200 ease-out
      flex flex-col overflow-hidden
    ">
      <div className="flex flex-col flex-1 p-5 gap-3">
        <div className="flex items-start justify-between gap-2">
          <span className="inline-block text-xs font-medium px-2.5 py-1 rounded-full bg-gold/15 text-gold/90 tracking-wide uppercase">
            {book.genre}
          </span>
          <span className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap ${SHELF_STYLES[book.shelf]}`}>
            {SHELF_LABELS[book.shelf]}
          </span>
        </div>

        <div className="flex-1">
          <h2 className="text-base font-semibold text-navy leading-snug line-clamp-2">
            {book.title}
          </h2>
          <p className="mt-1 text-sm text-navy/60">{book.author}</p>
        </div>

        {book.rating !== null && (
          <StarRating rating={book.rating} />
        )}
      </div>
    </article>
  )
}