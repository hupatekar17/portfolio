import type { Metadata } from 'next'
import Link from 'next/link'
import connectDB from '@/lib/db'
import Post from '@/models/Post'
import { format } from 'date-fns'

export const metadata: Metadata = {
  title: 'Blog — Harshavardhan Patekar',
}

// Revalidate every 60 seconds (ISR)
export const revalidate = 60

async function getPosts() {
  try {
    await connectDB()
    const posts = await Post.find({ published: true })
      .sort({ createdAt: -1 })
      .select('title slug excerpt tags createdAt')
      .lean()
    return JSON.parse(JSON.stringify(posts))
  } catch (err) {
    console.error('Failed to fetch posts:', err)
    return []
  }
}

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <div className="w-full mx-auto px-6 lg:px-12 py-20">
      <div className="mb-12">
        <p className="font-mono text-accent text-sm mb-4">$ cat blog/index.md</p>
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight">
          Blog
        </h1>
        <p className="text-muted font-mono text-base mt-3">
          Thoughts on backend engineering, AI, and building things.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="border border-border rounded-xl p-12 text-center bg-surface">
          <p className="font-mono text-muted text-sm mb-2">// no posts yet</p>
          <p className="text-muted text-sm">The first blog post is coming soon.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post: {
            _id: string
            slug: string
            title: string
            excerpt: string
            tags: string[]
            createdAt: string
          }) => (
            <Link
              key={post._id}
              href={`/blog/${post.slug}`}
              className="block border border-border rounded-xl p-6 bg-surface hover:border-accent/40 transition-all group"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="font-mono text-xs text-muted">
                  {format(new Date(post.createdAt), 'MMM d, yyyy')}
                </span>
                <span className="w-1 h-1 rounded-full bg-border" />
                <div className="flex gap-1.5">
                  {post.tags.slice(0, 3).map((t: string) => (
                    <span key={t} className="font-mono text-xs text-muted border border-border rounded px-1.5 py-0.5">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <h2 className="font-display font-bold text-2xl mb-2 group-hover:text-accent transition-colors">
                {post.title}
              </h2>
              <p className="text-base text-[#999] leading-relaxed line-clamp-2">{post.excerpt}</p>
              <p className="font-mono text-sm text-accent mt-3 group-hover:underline">read more →</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
