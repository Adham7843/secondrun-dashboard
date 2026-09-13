export default function PaywallGate({ name }: { name: string }) {
  return (
    <section style={{ border: "1px solid #ddd", padding: "1rem", marginTop: "1rem" }}>
      <h2>Unlock the full {name} teardown</h2>
      <p>Read the complete post-mortem, the rebuild playbook, and the technical spec.</p>
      <a href="/pricing">See Pro plans</a>
    </section>
  );
}
