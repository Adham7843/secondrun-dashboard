/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: the public surface (homepage, 30 dossiers, browse, latest,
  // pricing, newspaper) is fully pre-rendered. Zero env vars, zero database.
  // The vault dashboard renders its "opening soon" panel until the D1 migration.
  output: "export",
};
module.exports = nextConfig;
