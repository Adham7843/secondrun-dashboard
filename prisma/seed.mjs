import { PrismaClient } from "@prisma/client";
import { readFileSync } from "node:fs";

const prisma = new PrismaClient();

async function main() {
  const rows = JSON.parse(readFileSync(new URL("./seed-data/saas-sample.json", import.meta.url), "utf8"));
  for (const r of rows) {
    const existing = await prisma.company.findUnique({ where: { slug: r.slug } });
    if (existing) {
      await prisma.founder.deleteMany({ where: { companyId: existing.id } });
      await prisma.teardown.deleteMany({ where: { companyId: existing.id } });
      await prisma.company.delete({ where: { id: existing.id } });
    }

    await prisma.company.create({
      data: {
        slug: r.slug,
        name: r.name,
        batch: r.batch,
        status: r.status,
        tagline: r.tagline,
        industry: r.industry,
        location: r.location,
        foundedYear: r.foundedYear,
        closedYear: r.closedYear,
        capitalBurned: r.capitalBurned,
        fatalFlawSummary: r.fatalFlawSummary,
        ycUrl: r.ycUrl,
        websiteUrl: r.websiteUrl,
        founders: { create: r.founders },
        teardown: {
          create: {
            overview: r.teardown.overview,
            fatalFlaw: r.teardown.fatalFlaw,
            antiPatterns: r.teardown.antiPatterns ? JSON.stringify(r.teardown.antiPatterns) : null,
            rebuildThesis: r.teardown.rebuildThesis,
            businessModel: r.teardown.businessModel,
            agentPrompt: r.teardown.agentPrompt,
            sections: JSON.stringify(r.teardown.sections),
            sources: JSON.stringify(r.teardown.sources),
          },
        },
      },
    });
  }
  console.log(`Seeded ${rows.length} rich companies successfully.`);
}

main().finally(() => prisma.$disconnect());
