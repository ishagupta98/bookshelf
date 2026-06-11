function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-navy/8 shadow-sm p-5 flex flex-col gap-3 animate-pulse">
      <div className="flex items-start justify-between gap-2">
        <div className="h-6 w-20 rounded-full bg-navy/8" />
        <div className="h-6 w-24 rounded-full bg-navy/8" />
      </div>
      <div className="flex-1 flex flex-col gap-2">
        <div className="h-4 w-3/4 rounded bg-navy/8" />
        <div className="h-4 w-1/2 rounded bg-navy/8" />
        <div className="h-3 w-1/3 rounded bg-navy/6 mt-1" />
      </div>
      <div className="flex gap-1">
        {Array.from({ length: 5 }, (_, i) => (
          <div key={i} className="h-4 w-4 rounded bg-navy/8" />
        ))}
      </div>
    </div>
  )
}

export default function LoadingGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }, (_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}