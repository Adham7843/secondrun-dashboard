export default function TeardownToc({ toc }: { toc: { title: string; anchor: string }[] }) {
  return (
    <nav>
      <h2>On this page</h2>
      <ul>
        {toc.map((t) => (
          <li key={t.anchor}>
            <a href={`#${t.anchor}`}>{t.title}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
