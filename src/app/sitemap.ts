import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://printerfixdb.com'

  const brands = await prisma.brand.findMany()
  const articles = await prisma.article.findMany({
    where: { status: 'published' },
    include: { brand: true, category: true }
  })

  const brandUrls = brands.map((brand) => ({
    url: `${baseUrl}/brand/${brand.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const articleUrls = articles.map((article) => ({
    url: `${baseUrl}/${article.brand.slug}/${article.category.slug}/${article.slug}`,
    lastModified: article.updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...brandUrls,
    ...articleUrls,
  ]
}
