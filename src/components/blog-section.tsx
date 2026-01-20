'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight } from 'lucide-react';
import { BlogPost } from '@/lib/mdx';
import { formatDate } from '@/lib/date';

interface BlogSectionProps {
  posts: BlogPost[];
}

export function BlogSection({ posts }: BlogSectionProps) {
  const t = useTranslations('blog');

  if (posts.length === 0) {
    return null;
  }

  return (
    <section id="blog" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
            Latest Blog Posts
          </h2>
          <Button variant="outline" asChild>
            <Link href={"/blog" as any}>
              View All Posts
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                  <Calendar className="h-4 w-4" />
                  {formatDate(post.date)}
                </div>

                <h3 className="text-xl font-semibold mb-2 text-neutral-900 dark:text-neutral-100">
                  <Link
                    href={`/blog/${post.slug}` as any}
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {post.title}
                  </Link>
                </h3>

                <p className="text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-2">
                  {post.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/blog/${post.slug}` as any}>
                    Read More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}