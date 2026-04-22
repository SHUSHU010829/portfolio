import { MetadataRoute } from 'next'
import { getCaseStudies } from '@/lib/content'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const studies = await getCaseStudies()

  const caseStudyRoutes = studies.map(s => ({
    url: `https://shuyuan.tw/work/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    {
      url: 'https://shuyuan.tw',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://shuyuan.tw/work',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...caseStudyRoutes,
  ]
}
