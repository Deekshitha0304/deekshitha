interface CategoriesPageProps {
  params: {
    slug: string[]
  }
}

export default function CategoriesPage({ params }: CategoriesPageProps) {
  const { slug } = params

  return (
    <div className="w-full">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          Category Path:
        </h1>

        <p className="mt-3 text-slate-700">
          {slug.join(" / ")}
        </p>
      </div>
    </div>
  )
}

