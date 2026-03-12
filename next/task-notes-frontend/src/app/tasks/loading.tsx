export default function Loading() {
  return (
    <div className="mx-auto max-w-5xl">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="animate-pulse space-y-6">
          <div className="flex items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="h-7 w-40 rounded bg-slate-200" />
              <div className="h-4 w-64 rounded bg-slate-200" />
            </div>
            <div className="h-9 w-28 rounded-md bg-slate-200" />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="h-10 flex-1 rounded-full bg-slate-200" />
            <div className="h-10 w-full rounded-md bg-slate-200 sm:w-56" />
          </div>

          <div className="space-y-3">
            <div className="rounded-xl border border-slate-200 p-5">
              <div className="h-5 w-48 rounded bg-slate-200" />
              <div className="mt-3 h-4 w-full rounded bg-slate-200" />
              <div className="mt-2 h-4 w-3/4 rounded bg-slate-200" />
              <div className="mt-4 flex justify-end gap-2">
                <div className="h-9 w-20 rounded-md bg-slate-200" />
                <div className="h-9 w-20 rounded-md bg-slate-200" />
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 p-5">
              <div className="h-5 w-56 rounded bg-slate-200" />
              <div className="mt-3 h-4 w-full rounded bg-slate-200" />
              <div className="mt-2 h-4 w-2/3 rounded bg-slate-200" />
              <div className="mt-4 flex justify-end gap-2">
                <div className="h-9 w-20 rounded-md bg-slate-200" />
                <div className="h-9 w-20 rounded-md bg-slate-200" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

