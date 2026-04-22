import { MetadataRoute } from 'next'
import { getCaseStudies, getExperiments } from '@/lib/content'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [studies, experiments] = await Promise.all([getCaseStudies(), getExperiments()])

  const caseStudyRoutes = studies.map(s => ({
    url: `https://shuyuan.tw/work/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const experimentRoutes = experiments.map(e => ({
    url: `https://shuyuan.tw/play/${e.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [
    {
      url: 'https://shuyuan.tw',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: 'https://shuyuan.tw/work',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: 'https://shuyuan.tw/about',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: 'https://shuyuan.tw/play',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: 'https://shuyuan.tw/stream',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.5,
    },
    {
      url: 'https://shuyuan.tw/sudo',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.4,
    },
    {
      url: 'https://shuyuan.tw/secret',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
    ...caseStudyRoutes,
    ...experimentRoutes,
  ]
}
