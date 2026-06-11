interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative w-full">
      <span className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-navy/40">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
        </svg>
      </span>
      <input
        type="text"
        placeholder="Search by title, author, or genre…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full pl-12 pr-4 py-3 rounded-xl border border-navy/10 bg-white
          text-navy placeholder-navy/40 text-base
          shadow-sm focus:outline-none focus:ring-2 focus:ring-gold/60 focus:border-gold
          transition duration-150
        "
      />
    </div>
  )
}