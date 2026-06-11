interface EmptyStateProps {
  query: string
}

export default function EmptyState({ query }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
      <span className="text-5xl select-none">📚</span>
      <p className="text-xl font-semibold text-navy">
        {query ? `No results for "${query}"` : 'No books yet'}
      </p>
      <p className="text-sm text-navy/50 max-w-xs">
        {query
          ? 'Try a different title, author, or genre.'
          : 'Add some books via the API to get started.'}
      </p>
    </div>
  )
}
