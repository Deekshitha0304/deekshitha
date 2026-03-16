export default function Loading() {
  return (
    <main className="w-full p-8">
      <div className="grid gap-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="rounded-xl border border-border p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="h-5 w-52 animate-pulse bg-gray-200 rounded" />
                <div className="mt-2 h-4 w-32 animate-pulse bg-gray-200 rounded" />
              </div>
              <div className="h-7 w-16 animate-pulse bg-gray-200 rounded" />
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}


