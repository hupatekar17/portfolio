import Link from 'next/link'

const skills = {
  Backend: ['Node.js', 'Express.js', 'Python', 'Java', 'REST APIs'],
  Frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
  Databases: ['MongoDB', 'PostgreSQL', 'SQL', 'Indexing & Schema Design'],
  'AI / ML': ['Machine Learning Pipelines', 'Fraud Detection', 'Large-scale Datasets'],
  Tools: ['Git', 'Agile/Scrum', 'Azure', 'System Design', 'DSA'],
}

const experience = [
  {
    company: 'Cloudhandz Logistics',
    role: 'Software Developer',
    period: 'Aug 2023 – Sep 2024',
    location: 'Mumbai',
    highlights: [
      'Designed RESTful APIs with Node.js & Express.js for 5+ enterprise clients',
      'Reduced MongoDB API response time by ~40% (480ms → 290ms) via schema + indexing optimisation',
      'Built a PMS automating internal workflows, improving operational efficiency by 25%',
      'Automated document validation pipelines, cutting manual processing by 50%+',
    ],
  },
  {
    company: 'Mindtree',
    role: 'Software Engineer Intern',
    period: 'Mar 2023 – Aug 2023',
    location: 'Remote',
    highlights: [
      'Developed Java backend modules handling 10,000+ monthly transactions',
      'Improved API response time by ~27% (850ms → 620ms) through legacy refactoring',
      'Increased test coverage from 58% → 82% via unit testing of core modules',
    ],
  },
]

export default function HomePage() {
  return (
    <div className="w-full mx-auto px-6 lg:px-12 py-20">


      {/* ── HERO ── */}
      <section className="mb-28">
        <p className="font-mono text-accent text-sm mb-4 opacity-0 animate-fade-up" style={{ animationDelay: '0ms', animationFillMode: 'forwards' }}>
          $ whoami
        </p>
        <h1
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-none tracking-tight mb-6 opacity-0 animate-fade-up"
          style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}
        >
          Harshavardhan
          <br />
          <span className="text-accent">Patekar</span>
        </h1>
        <p
          className="text-muted font-mono text-base sm:text-lg max-w-xl mb-8 leading-relaxed opacity-0 animate-fade-up"
          style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}
        >
          Backend & Full-Stack Developer — building scalable systems, RESTful APIs,
          and data-driven applications. MSc AI @ DCU. Ex-Cloudhandz.
        </p>
        <div
          className="flex items-center gap-4 opacity-0 animate-fade-up"
          style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}
        >
          <Link
            href="/projects"
            className="font-mono text-sm px-5 py-2.5 bg-accent text-black font-medium rounded hover:bg-accent-dim transition-colors"
          >
            view projects
          </Link>
          <Link
            href="/blog"
            className="font-mono text-sm px-5 py-2.5 border border-border text-muted hover:border-accent hover:text-accent transition-colors rounded"
          >
            read blog
          </Link>
          <a
            href="https://www.linkedin.com/in/hupatekar17"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm text-muted hover:text-accent transition-colors"
          >
            linkedin ↗
          </a>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="mb-24">
        <SectionLabel>$ cat about.txt</SectionLabel>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4 text-base text-[#aaa] leading-relaxed">
            <p>
              I&apos;m a backend-focused developer with a passion for building systems
              that are fast, reliable, and elegant under the hood. I care about
              performance — not just features.
            </p>
            <p>
              Currently pursuing my MSc in Artificial Intelligence at Dublin City University,
              where I work on ML pipelines and intelligent applications on top of my
              backend engineering foundation.
            </p>
            <p>
              I&apos;ve built end-to-end ML systems processing 500K+ records and
              designed API-driven logistics platforms serving enterprise clients.
            </p>
          </div>
          <div className="space-y-2">
            {[
              ['Education', 'MSc AI — Dublin City University (2024–2025)'],
              ['Undergrad', 'BTech CS — VIT Bhopal (2019–2023)'],
              ['Location', 'Dublin, Ireland 🇮🇪'],
              ['Email', 'hupatekar17@hotmail.com'],
              ['Cert', 'Microsoft Azure Fundamentals'],
            ].map(([k, v]) => (
              <div key={k} className="flex gap-3 font-mono text-sm">
                <span className="text-accent w-28 shrink-0">{k}</span>
                <span className="text-muted">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section className="mb-24">
        <SectionLabel>$ ls ./skills</SectionLabel>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(skills).map(([cat, items]) => (
            <div key={cat} className="border border-border rounded-lg p-5 bg-surface hover:border-accent/30 transition-colors">
              <p className="font-mono text-accent text-sm mb-3">{cat}/</p>
              <div className="flex flex-wrap gap-1.5">
                {items.map((s) => (
                  <span key={s} className="font-mono text-xs text-muted border border-border rounded px-2 py-0.5 bg-bg">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section className="mb-24">
        <SectionLabel>$ cat experience.json</SectionLabel>
        <div className="space-y-6">
          {experience.map((job, i) => (
            <div key={i} className="border border-border rounded-lg p-6 bg-surface hover:border-accent/30 transition-colors group">
              <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
                <div>
                  <h3 className="font-display font-bold text-xl text-text group-hover:text-accent transition-colors">
                    {job.company}
                  </h3>
                  <p className="font-mono text-sm text-muted mt-0.5">{job.role} · {job.location}</p>
                </div>
                <span className="font-mono text-sm text-muted border border-border rounded px-2 py-1">{job.period}</span>
              </div>
              <ul className="space-y-1.5">
                {job.highlights.map((h, j) => (
                  <li key={j} className="text-base text-[#999] flex gap-2">
                    <span className="text-accent mt-0.5 shrink-0">›</span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="border border-accent/20 rounded-xl p-8 bg-accent/5 text-center">
        <p className="font-mono text-accent text-sm mb-2">$ echo &quot;open to opportunities&quot;</p>
        <h2 className="font-display font-bold text-3xl mb-3">Available for Backend / Full-Stack Roles</h2>
        <p className="text-muted text-base mb-6">Dublin-based · Open to hybrid/remote</p>
        <a
          href="mailto:hupatekar17@hotmail.com"
          className="font-mono text-base px-6 py-2.5 bg-accent text-black font-medium rounded hover:bg-accent-dim transition-colors inline-block"
        >
          get in touch →
        </a>
      </section>
    </div>
  )
}

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="font-mono text-accent text-sm mb-6 flex items-center gap-2">
      {children}
      <span className="flex-1 h-px bg-border" />
    </p>
  )
}
