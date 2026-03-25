import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, team } from "@/data";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ArticleDetailPage({ params }: Props) {
  const { id } = await params;
  const articleId = Number(id);
  const article = articles.find((item) => item.id === articleId);

  if (!article) {
    notFound();
  }

  const authorName = team.find((member) => member.id === article.author)?.name ?? "Unknown";

  return (
    <section className="mx-auto max-w-3xl rounded-xl border border-border bg-card p-6 shadow-md">
      <h1 className="text-3xl font-bold">{article.title}</h1>
      <p className="mt-2 text-sm text-muted">
        {authorName} · {article.date}
      </p>
      <p className="mt-6 leading-relaxed text-muted">{article.body}</p>
      <Link
        className="mt-8 inline-flex rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-500"
        href="/articles"
      >
        Back to Articles
      </Link>
    </section>
  );
}
