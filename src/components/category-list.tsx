export default function CategoryList({
  categories,
}: {
  categories: { industry: string; count: number; top: string[] }[];
}) {
  return (
    <ol>
      {categories.map((c) => (
        <li key={c.industry}>
          <a href={`/browse/category/${encodeURIComponent(c.industry)}`}>{c.industry}</a> {c.top.join(", ")} {c.count}
        </li>
      ))}
    </ol>
  );
}
