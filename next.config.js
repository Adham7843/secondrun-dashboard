/** @type {import('next').NextConfig} */
const nextConfig = {
  // VAULT: fully dynamic (dashboard + full dossiers read SQLite/D1 per request).
  // Never static-exported: 1,170 vault-only slugs have no pregenerated pages,
  // and prompt data must never bake into exportable HTML for strangers.
};
module.exports = nextConfig;
