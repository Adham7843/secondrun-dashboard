export default function FounderCard({
  founder,
}: {
  founder: { name: string; role: string | null; xUrl: string | null; linkedinUrl: string | null };
}) {
  const initials = founder.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
  return (
    <li>
      <span>{initials}</span> <strong>{founder.name}</strong>
      {founder.role ? <span> {founder.role}</span> : null}{" "}
      {founder.xUrl ? <a href={founder.xUrl}>X / Twitter</a> : null}{" "}
      {founder.linkedinUrl ? <a href={founder.linkedinUrl}>LinkedIn</a> : null}
    </li>
  );
}
