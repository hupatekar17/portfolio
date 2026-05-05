import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import Post from '@/models/Post'

// GET /api/posts — list published posts (or all if admin param)
export async function GET(req: NextRequest) {
  try {
    await connectDB()
    const { searchParams } = new URL(req.url)
    const all = searchParams.get('all') === 'true'

    const query = all ? {} : { published: true }
    const posts = await Post.find(query)
      .sort({ createdAt: -1 })
      .select('-content') // exclude full content in listing
      .lean()

    return NextResponse.json({ posts })
  } catch (err) {
    console.error('GET /api/posts error:', err)
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 })
  }
}

// POST /api/posts — create a new post (requires admin password)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Simple password check — replace with proper auth in production
    const adminPassword = process.env.ADMIN_PASSWORD
    if (!adminPassword || body.password !== adminPassword) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()

    const { title, slug, excerpt, content, tags, published } = body

    if (!title || !content || !excerpt) {
      return NextResponse.json(
        { error: 'title, excerpt, and content are required' },
        { status: 400 }
      )
    }

    const post = await Post.create({
      title,
      slug: slug || undefined, // auto-generated if not provided
      excerpt,
      content,
      tags: tags || [],
      published: published ?? false,
    })

    return NextResponse.json({ post }, { status: 201 })
  } catch (err: unknown) {
    if (err && typeof err === 'object' && 'code' in err && (err as { code: number }).code === 11000) {
      return NextResponse.json({ error: 'A post with this slug already exists' }, { status: 409 })
    }
    console.error('POST /api/posts error:', err)
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 })
  }
}
