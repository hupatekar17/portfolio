import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IPost extends Document {
  title: string
  slug: string
  excerpt: string
  content: string
  tags: string[]
  published: boolean
  createdAt: Date
  updatedAt: Date
}

const PostSchema = new Schema<IPost>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    excerpt: { type: String, required: true, maxlength: 300 },
    content: { type: String, required: true },
    tags: [{ type: String, trim: true }],
    published: { type: Boolean, default: false },
  },
  { timestamps: true }
)

// Auto-generate slug from title if not provided
PostSchema.pre('validate', function (next) {
  if (this.title && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }
  next()
})

// Prevent model recompilation in Next.js dev mode
const Post: Model<IPost> =
  mongoose.models.Post || mongoose.model<IPost>('Post', PostSchema)

export default Post
