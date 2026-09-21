import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const slugs = ["hp-smart-app-stuck-searching-for-printer", "phomemo-label-maker-comparison-m110-m120-m150-m221", "bixolon-network-printer-offline", "hp-officejet-pro-9015e-printhead-missing", "niimbot-rfid-chip-fault-non-universal-labels-error"]
  const articles = await prisma.article.findMany({
    where: { slug: { in: slugs } }
  })
  const fs = require('fs')
  fs.writeFileSync('articles-9123d9b2.json', JSON.stringify(articles, null, 2))
}
main()
