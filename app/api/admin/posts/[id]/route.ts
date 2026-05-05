import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import Post from '@/models/Post'

interface Params {
  params: { id: string }
}

// GET /api/admin/posts/[id]
export async function GET(_req: NextRequest, { params }: Params) {
  try {
    await connectDB()
    const post = await Post.findById(params.id).lean()
    if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json({ post })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 })
  }
}

// PATCH /api/admin/posts/[id] — update a post
export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    const body = await req.json()

    const adminPassword = process.env.ADMIN_PASSWORD
    if (!adminPassword || body.password !== adminPassword) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()

    const { password: _, ...updates } = body
    const post = await Post.findByIdAndUpdate(params.id, updates, { new: true })
    if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    return NextResponse.json({ post })
  } catch {
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 })
  }
}

// DELETE /api/admin/posts/[id]
export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    const body = await req.json()

    const adminPassword = process.env.ADMIN_PASSWORD
    if (!adminPassword || body.password !== adminPassword) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()
    await Post.findByIdAndDelete(params.id)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 })
  }
}
