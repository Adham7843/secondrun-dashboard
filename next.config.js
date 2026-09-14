/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: the public surface (homepage, 30 dossiers, browse, latest,
  // pricing, newspaper) is fully pre-rendered. Zero env vars, zero database.
  // The vault dashboard renders its "opening soon" panel until the D1 migration.
  output: "export",
  // GitHub Pages serves each FRONTEND under a subpath (/secondrun, /secondrun-egypt).
  // NEXT_BASE_PATH is set per-repo by the Pages workflow; empty = serve from root
  // (local dev, or later when a custom domain points at the repo).
  basePath: process.env.NEXT_BASE_PATH || "",
  trailingSlash: true,
};
module.exports = nextConfig;
