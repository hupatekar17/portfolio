import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import connectDB from '@/lib/db'
import Post from '@/models/Post'
import { format } from 'date-fns'

export const revalidate = 60

interface Props {
  params: { slug: string }
}

async function getPost(slug: string) {
  try {
    await connectDB()
    const post = await Post.findOne({ slug, published: true }).lean()
    if (!post) return null
    return JSON.parse(JSON.stringify(post))
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug)
  if (!post) return { title: 'Not Found' }
  return {
    title: `${post.title} — Harshavardhan Patekar`,
    description: post.excerpt,
  }
}

export default async function PostPage({ params }: Props) {
  const post = await getPost(params.slug)
  if (!post) notFound()

  return (
    <div className="w-full max-w-3xl mx-auto px-6 lg:px-8 py-20">

      {/* Back */}
      <Link href="/blog" className="font-mono text-xs text-muted hover:text-accent transition-colors flex items-center gap-1 mb-12">
        ← back to blog
      </Link>

      {/* Header */}
      <header className="mb-10">
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((t: string) => (
            <span key={t} className="font-mono text-xs text-accent border border-accent/30 bg-accent/5 rounded px-2 py-0.5">
              {t}
            </span>
          ))}
        </div>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl leading-tight mb-4">
          {post.title}
        </h1>
        <p className="font-mono text-sm text-muted">
          {format(new Date(post.createdAt), 'MMMM d, yyyy')}
        </p>
      </header>

      <hr className="border-border mb-10" />

      {/* Content */}
      <article className="prose max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.content}
        </ReactMarkdown>
      </article>

      <hr className="border-border mt-12 mb-8" />

      <div className="flex justify-between items-center">
        <Link href="/blog" className="font-mono text-xs text-muted hover:text-accent transition-colors">
          ← all posts
        </Link>
        <a
          href="https://www.linkedin.com/in/hupatekar17"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs text-muted hover:text-accent transition-colors"
        >
          linkedin ↗
        </a>
      </div>
    </div>
  )
}
