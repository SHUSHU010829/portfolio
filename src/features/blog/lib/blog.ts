import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { z } from "zod";

const BLOG_PATH = path.join(process.cwd(), "src/features/blog/content");

const BlogPostSchema = z.object({
  title: z.string(),
  publishedAt: z.string(),
  summary: z.string(),
  featured: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
});

export type BlogPost = z.infer<typeof BlogPostSchema> & {
  slug: string;
  content: string;
};

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (!fs.existsSync(BLOG_PATH)) {
    return [];
  }

  const files = fs.readdirSync(BLOG_PATH);
  const posts = files
    .filter((file) => path.extname(file) === ".mdx")
    .map((file) => {
      const filePath = path.join(BLOG_PATH, file);
      const source = fs.readFileSync(filePath, "utf8");
      const { content, data } = matter(source);

      const slug = path.basename(file, path.extname(file));
      const parsed = BlogPostSchema.safeParse(data);

      if (!parsed.success) {
        console.warn(`Invalid frontmatter in ${file}:`, parsed.error);
        return null;
      }

      return {
        ...parsed.data,
        slug,
        content,
      };
    })
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  return posts;
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const posts = await getBlogPosts();
  return posts.find((post) => post.slug === slug) || null;
}