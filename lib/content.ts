import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'

export type CaseStudy = {
  slug: string
  title: string
  subtitle: string
  role: string
  year: string
  status: 'published' | 'draft'
  order: number
  stack: string[]
  coverImage?: string
  description: string
}

export async function getCaseStudies(): Promise<CaseStudy[]> {
  const dir = path.join(process.cwd(), 'content/work')

  let files: string[]
  try {
    files = await fs.readdir(dir)
  } catch {
    return []
  }

  const studies = await Promise.all(
    files
      .filter(f => f.endsWith('.mdx'))
      .map(async f => {
        const raw = await fs.readFile(path.join(dir, f), 'utf8')
        const { data } = matter(raw)
        return {
          slug: f.replace(/\.mdx$/, ''),
          ...data,
        } as CaseStudy
      }),
  )

  return studies
    .filter(s => s.status === 'published')
    .sort((a, b) => a.order - b.order)
}

export async function getCaseStudy(slug: string): Promise<CaseStudy | null> {
  const filePath = path.join(process.cwd(), 'content/work', `${slug}.mdx`)
  try {
    const raw = await fs.readFile(filePath, 'utf8')
    const { data } = matter(raw)
    return { slug, ...data } as CaseStudy
  } catch {
    return null
  }
}
