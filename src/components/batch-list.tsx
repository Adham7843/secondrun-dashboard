export default function BatchList({ batches }: { batches: { batch: string; count: number }[] }) {
  return (
    <div>
      {batches.map((b) => (
        <a key={b.batch} href={`/browse/batch/${encodeURIComponent(b.batch)}`} style={{ marginRight: "0.75rem" }}>
          {b.batch} {b.count} reports
        </a>
      ))}
    </div>
  );
}
