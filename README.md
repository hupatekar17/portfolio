# Harshavardhan Patekar — Portfolio

A full-stack portfolio site with a MongoDB-backed blog engine. Built with:

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **MongoDB + Mongoose**
- **React Markdown** (for blog rendering)

---

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Copy the example file and fill in your values:

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```env
MONGODB_URI=mongodb://localhost:27017/portfolio
ADMIN_PASSWORD=your_secure_password_here
```

### 3. MongoDB Setup

**Option A — Local MongoDB:**
```bash
# Install MongoDB locally, then start it:
mongod --dbpath /data/db
```

**Option B — MongoDB Atlas (recommended for production):**
1. Go to https://cloud.mongodb.com
2. Create a free cluster
3. Click "Connect" → "Drivers"
4. Copy the connection string into `MONGODB_URI`

```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
```

### 4. Run the development server

```bash
npm run dev
```

Open http://localhost:3000

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — hero, about, skills, experience |
| `/projects` | Projects showcase |
| `/blog` | Blog listing (published posts from MongoDB) |
| `/blog/[slug]` | Individual blog post with Markdown rendering |
| `/admin` | Blog editor (password protected) |

---

## Writing Blog Posts

1. Go to `/admin`
2. Enter your `ADMIN_PASSWORD`
3. Fill in the form:
   - **Title**: Your post title
   - **Slug**: URL-friendly identifier (auto-generated if left blank)
   - **Excerpt**: Short description (shown in listings, max 300 chars)
   - **Content**: Full post content in **Markdown**
   - **Tags**: Comma-separated (e.g. `Node.js, MongoDB, Performance`)
   - **Publish**: Check to make it live immediately
4. Click "create post"

### Markdown Features Supported

- Headings (`# ## ###`)
- **Bold**, _italic_, `inline code`
- Code blocks with syntax highlighting
- Tables, blockquotes, lists
- Links and images

---

## API Routes

```
GET  /api/posts          — List published posts
POST /api/posts          — Create post (requires password in body)

GET    /api/admin/posts/[id]   — Get single post
PATCH  /api/admin/posts/[id]   — Update post (requires password)
DELETE /api/admin/posts/[id]   — Delete post (requires password)
```

---

## Deployment (Vercel)

1. Push to GitHub
2. Import project at https://vercel.com/new
3. Add environment variables in Vercel dashboard:
   - `MONGODB_URI` → your Atlas connection string
   - `ADMIN_PASSWORD` → your secure password
4. Deploy!

---

## Project Structure

```
portfolio/
├── app/
│   ├── page.tsx              # Home page
│   ├── projects/page.tsx     # Projects
│   ├── blog/
│   │   ├── page.tsx          # Blog listing
│   │   └── [slug]/page.tsx   # Individual post
│   ├── admin/page.tsx        # Blog editor
│   └── api/
│       ├── posts/route.ts    # GET & POST posts
│       └── admin/posts/[id]/route.ts  # PATCH & DELETE
├── components/
│   └── Navbar.tsx
├── lib/
│   └── db.ts                 # MongoDB connection (singleton)
├── models/
│   └── Post.ts               # Mongoose schema
└── .env.local.example        # Environment variables template
```
