import Link from "next/link";
import { articles, team } from "@/data";

export default function ArticlesPage() {
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold">Articles</h1>
      <ul className="mt-6 space-y-4">
        {articles.map((article) => (
          <li
            key={article.id}
            className="rounded-xl border border-border bg-card p-5 shadow-md transition hover:shadow-lg"
          >
            <Link className="text-lg font-semibold hover:text-indigo-500" href={`/articles/${article.id}`}>
              {article.title}
            </Link>
            <p className="mt-2 text-sm text-muted">
              {team.find((member) => member.id === article.author)?.name ?? "Unknown"} · {article.date}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
