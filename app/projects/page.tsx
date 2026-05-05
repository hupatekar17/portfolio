import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects — Harshavardhan Patekar',
}

const projects = [
  {
    title: 'Fraud Detection ML System',
    description:
      'End-to-end machine learning pipeline for detecting fraudulent transactions on large-scale datasets (500K+ records). Built with Python, scikit-learn, and MongoDB for data storage.',
    tags: ['Python', 'scikit-learn', 'MongoDB', 'ML Pipeline', 'Data Engineering'],
    highlights: [
      'Processed 500K+ records with feature engineering and preprocessing pipelines',
      'Evaluated multiple classifiers (Random Forest, XGBoost, Logistic Regression)',
      'Achieved high precision/recall balance using SMOTE for class imbalance',
    ],
    status: 'completed',
    type: 'ML / AI',
  },
  {
    title: 'Performance Management System (PMS)',
    description:
      'Internal workflow automation platform built at Cloudhandz Logistics that improved operational efficiency by 25% across departments.',
    tags: ['Node.js', 'Express.js', 'MongoDB', 'REST API'],
    highlights: [
      'Automated multi-step approval workflows replacing manual spreadsheet tracking',
      'Built role-based dashboards for team leads and HR',
      'Reduced review cycle time by ~25% through automated notifications',
    ],
    status: 'production',
    type: 'Backend',
  },
  {
    title: 'Logistics API Platform',
    description:
      'Scalable RESTful API system powering logistics workflows for 5+ enterprise clients. Optimised MongoDB schemas reduced API latency by 40%.',
    tags: ['Node.js', 'Express.js', 'MongoDB', 'PostgreSQL', 'REST APIs'],
    highlights: [
      'Reduced API response time from 480ms to 290ms (~40%) via indexing optimisation',
      'Designed multi-tenant schema supporting 5+ enterprise clients',
      'Implemented automated document validation reducing manual processing by 50%',
    ],
    status: 'production',
    type: 'Backend',
  },
  {
    title: 'Enterprise Workflow Automation (Mindtree)',
    description:
      'Java-based backend service modules for enterprise approval and validation workflows handling 10,000+ monthly transactions.',
    tags: ['Java', 'REST APIs', 'JUnit', 'Enterprise'],
    highlights: [
      'Improved API response time by 27% through legacy code refactoring',
      'Increased unit test coverage from 58% to 82%',
      'Implemented centralised logging reducing production defects by 25%',
    ],
    status: 'production',
    type: 'Backend',
  },
  {
    title: 'Personal Portfolio + Blog',
    description:
      'This very site — a full-stack portfolio with a MongoDB-backed blog engine. Built with Next.js 14, TypeScript, and Tailwind CSS.',
    tags: ['Next.js', 'TypeScript', 'MongoDB', 'Tailwind CSS', 'Full-Stack'],
    highlights: [
      'App Router with server and client components',
      'MongoDB blog with slug-based routing and markdown rendering',
      'Admin panel for writing and publishing posts',
    ],
    status: 'live',
    type: 'Full-Stack',
    link: '/',
  },
]

const statusColors: Record<string, string> = {
  completed: 'text-yellow-500 border-yellow-500/30 bg-yellow-500/5',
  production: 'text-accent border-accent/30 bg-accent/5',
  live: 'text-blue-400 border-blue-400/30 bg-blue-400/5',
}

export default function ProjectsPage() {
  return (
    <div className="w-full mx-auto px-6 lg:px-12 py-20">

      <div className="mb-12">
        <p className="font-mono text-accent text-sm mb-4">$ ls -la ./projects</p>
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight">
          Projects
        </h1>
        <p className="text-muted font-mono text-base mt-3">
          Things I&apos;ve shipped, built, and learned from.
        </p>
      </div>

      <div className="grid gap-5">
        {projects.map((p, i) => (
          <article
            key={i}
            className="border border-border rounded-xl p-6 bg-surface hover:border-accent/40 transition-all group"
          >
            <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-muted border border-border rounded px-2 py-0.5">
                  {p.type}
                </span>
                <span className={`font-mono text-xs border rounded px-2 py-0.5 ${statusColors[p.status]}`}>
                  {p.status}
                </span>
              </div>
              {p.link && (
                <a href={p.link} className="font-mono text-sm text-accent hover:underline">
                  view →
                </a>
              )}
            </div>

            <h2 className="font-display font-bold text-2xl mb-2 group-hover:text-accent transition-colors">
              {p.title}
            </h2>
            <p className="text-base text-[#999] mb-4 leading-relaxed">{p.description}</p>

            <ul className="space-y-1 mb-5">
              {p.highlights.map((h, j) => (
                <li key={j} className="text-sm text-muted flex gap-2">
                  <span className="text-accent shrink-0">›</span>
                  {h}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-1.5">
              {p.tags.map((t) => (
                <span key={t} className="font-mono text-xs text-muted border border-border rounded px-2 py-0.5 bg-bg">
                  {t}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
