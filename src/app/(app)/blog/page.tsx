import Link from "next/link";
import { getBlogPosts } from "@/features/blog/lib/blog";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Blog",
  description: "Thoughts on web development, React, and technology",
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="mb-12">
        <h1 className="mb-4 text-4xl font-bold">Blog</h1>
        <p className="text-lg text-muted-foreground">
          Thoughts on web development, React, and technology
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center">
          <p className="text-muted-foreground">No blog posts yet.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {posts.map((post) => (
            <article key={post.slug} className="group">
              <div className="rounded-lg border p-6 transition-colors hover:bg-muted/50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h2 className="mb-2 text-2xl font-semibold group-hover:text-primary">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>
                    <p className="mb-4 text-muted-foreground">{post.summary}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <time dateTime={post.publishedAt}>
                        {new Date(post.publishedAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </time>
                      {post.tags.length > 0 && (
                        <div className="flex gap-2">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full bg-secondary px-2 py-1 text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/blog/${post.slug}`}>Read more</Link>
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}