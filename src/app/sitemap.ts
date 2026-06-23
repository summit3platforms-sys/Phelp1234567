import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://libertyprinterfix.com'

  const brands = await prisma.brand.findMany()
  const articles = await prisma.article.findMany({
    where: { status: 'published' },
    include: { brand: true, category: true }
  })

  const brandUrls = brands.map((brand) => ({
    url: `${baseUrl}/${brand.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const activeBrandCategories = await prisma.article.findMany({
    where: { status: 'published' },
    select: {
      brand: { select: { slug: true } },
      category: { select: { slug: true } }
    },
    distinct: ['brandId', 'categoryId']
  })

  const categoryUrls = activeBrandCategories.map((bc) => ({
    url: `${baseUrl}/${bc.brand.slug}/${bc.category.slug}`,
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
    ...categoryUrls,
    ...articleUrls,
  ]
}
