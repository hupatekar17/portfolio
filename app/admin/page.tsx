'use client'
import { useState, useEffect } from 'react'

interface Post {
  _id: string
  title: string
  slug: string
  excerpt: string
  content: string
  tags: string[]
  published: boolean
  createdAt: string
}

const EMPTY_FORM = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  tags: '',
  published: false,
}

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [authed, setAuthed] = useState(false)
  const [posts, setPosts] = useState<Post[]>([])
  const [form, setForm] = useState(EMPTY_FORM)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)
  const [tab, setTab] = useState<'editor' | 'posts'>('editor')

  async function login() {
    // Simple client-side gate — real auth happens server-side on each request
    setAuthed(true)
    fetchPosts()
  }

  async function fetchPosts() {
    const res = await fetch('/api/posts?all=true')
    const data = await res.json()
    setPosts(data.posts || [])
  }

  async function handleSubmit() {
    if (!form.title || !form.excerpt || !form.content) {
      setStatus('❌ Title, excerpt, and content are required.')
      return
    }
    setLoading(true)
    setStatus('')

    const payload = {
      ...form,
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
      password,
    }

    try {
      if (editingId) {
        const res = await fetch(`/api/admin/posts/${editingId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error)
        setStatus('✅ Post updated!')
      } else {
        const res = await fetch('/api/posts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error)
        setStatus('✅ Post created!')
      }
      setForm(EMPTY_FORM)
      setEditingId(null)
      fetchPosts()
    } catch (err: unknown) {
      setStatus(`❌ ${err instanceof Error ? err.message : 'Something went wrong'}`)
    }
    setLoading(false)
  }

  async function deletePost(id: string) {
    if (!confirm('Delete this post?')) return
    await fetch(`/api/admin/posts/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    fetchPosts()
  }

  function editPost(post: Post) {
    setForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      tags: post.tags.join(', '),
      published: post.published,
    })
    setEditingId(post._id)
    setTab('editor')
  }

  function cancelEdit() {
    setForm(EMPTY_FORM)
    setEditingId(null)
    setStatus('')
  }

  if (!authed) {
    return (
      <div className="max-w-sm mx-auto px-6 py-32">
        <p className="font-mono text-accent text-xs mb-6">$ sudo ./admin</p>
        <h1 className="font-display font-bold text-3xl mb-8">Admin Login</h1>
        <input
          type="password"
          placeholder="Admin password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && login()}
          className="w-full bg-surface border border-border rounded-lg px-4 py-3 font-mono text-sm text-text focus:outline-none focus:border-accent mb-4"
        />
        <button
          onClick={login}
          className="w-full bg-accent text-black font-mono text-sm font-medium rounded-lg py-3 hover:bg-accent-dim transition-colors"
        >
          enter
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="font-mono text-accent text-xs mb-2">$ vim blog/new-post.md</p>
          <h1 className="font-display font-bold text-4xl">Blog Admin</h1>
        </div>
        <div className="flex gap-2">
          {['editor', 'posts'].map(t => (
            <button
              key={t}
              onClick={() => setTab(t as 'editor' | 'posts')}
              className={`font-mono text-xs px-4 py-2 rounded transition-colors ${
                tab === t ? 'bg-accent text-black' : 'border border-border text-muted hover:text-text'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {tab === 'editor' && (
        <div className="space-y-4">
          {editingId && (
            <div className="flex items-center justify-between bg-accent/10 border border-accent/30 rounded-lg px-4 py-2">
              <span className="font-mono text-xs text-accent">Editing existing post</span>
              <button onClick={cancelEdit} className="font-mono text-xs text-muted hover:text-text">cancel ×</button>
            </div>
          )}

          <Field label="Title *">
            <input
              value={form.title}
              onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              placeholder="How I optimised a MongoDB query by 40%"
              className={inputClass}
            />
          </Field>

          <Field label="Slug (auto-generated if empty)">
            <input
              value={form.slug}
              onChange={e => setForm(f => ({ ...f, slug: e.target.value }))}
              placeholder="how-i-optimised-mongodb-query"
              className={inputClass}
            />
          </Field>

          <Field label="Excerpt * (max 300 chars)">
            <textarea
              value={form.excerpt}
              onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))}
              placeholder="A short description shown in the blog listing..."
              rows={2}
              maxLength={300}
              className={inputClass}
            />
          </Field>

          <Field label="Content * (Markdown supported)">
            <textarea
              value={form.content}
              onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
              placeholder="## Introduction&#10;&#10;Write your post content here using **Markdown**..."
              rows={18}
              className={`${inputClass} font-mono text-xs leading-relaxed`}
            />
          </Field>

          <Field label="Tags (comma-separated)">
            <input
              value={form.tags}
              onChange={e => setForm(f => ({ ...f, tags: e.target.value }))}
              placeholder="Node.js, MongoDB, Performance"
              className={inputClass}
            />
          </Field>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.published}
                onChange={e => setForm(f => ({ ...f, published: e.target.checked }))}
                className="accent-accent w-4 h-4"
              />
              <span className="font-mono text-xs text-muted">Publish immediately</span>
            </label>
          </div>

          {status && (
            <p className="font-mono text-xs text-muted border border-border rounded px-3 py-2">{status}</p>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="font-mono text-sm px-6 py-2.5 bg-accent text-black font-medium rounded-lg hover:bg-accent-dim transition-colors disabled:opacity-50"
          >
            {loading ? 'saving...' : editingId ? 'update post' : 'create post'}
          </button>
        </div>
      )}

      {tab === 'posts' && (
        <div>
          {posts.length === 0 ? (
            <p className="font-mono text-muted text-sm">No posts yet.</p>
          ) : (
            <div className="space-y-3">
              {posts.map(p => (
                <div key={p._id} className="border border-border rounded-lg p-4 bg-surface flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`font-mono text-[10px] border rounded px-1.5 py-0.5 ${
                        p.published ? 'text-accent border-accent/30' : 'text-muted border-border'
                      }`}>
                        {p.published ? 'published' : 'draft'}
                      </span>
                    </div>
                    <h3 className="font-display font-semibold text-sm">{p.title}</h3>
                    <p className="font-mono text-[10px] text-muted mt-1">/blog/{p.slug}</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => editPost(p)}
                      className="font-mono text-xs text-muted hover:text-accent border border-border rounded px-3 py-1 transition-colors"
                    >
                      edit
                    </button>
                    <button
                      onClick={() => deletePost(p._id)}
                      className="font-mono text-xs text-muted hover:text-red-400 border border-border rounded px-3 py-1 transition-colors"
                    >
                      delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="font-mono text-xs text-muted block mb-1.5">{label}</label>
      {children}
    </div>
  )
}

const inputClass =
  'w-full bg-surface border border-border rounded-lg px-4 py-3 text-sm text-text focus:outline-none focus:border-accent transition-colors resize-y placeholder:text-muted/50'
