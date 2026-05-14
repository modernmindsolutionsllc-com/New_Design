import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, Calendar } from 'lucide-react'
import Badge from '@components/ui/Badge'
import CTABanner from '@components/home/CTABanner'
import { BLOG_POSTS } from '@data/blogPosts'
import { FADE_UP, STAGGER_CONTAINER } from '@utils/constants'

const BlogPostPage = () => {
  const { slug } = useParams()
  const post = BLOG_POSTS.find(p => p.slug === slug)

  // Redirect to blog list if slug not found
  if (!post) return <Navigate to="/blog" replace />

  return (
    <>
      {/* Hero */}
      <section className="blog-post__hero section--gray">
        <div className="container">
          <motion.div
            className="blog-post__hero-inner"
            variants={STAGGER_CONTAINER}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={FADE_UP}>
              <Link to="/blog" className="blog-post__back">
                <ArrowLeft size={16} /> Back to Blog
              </Link>
            </motion.div>

            <motion.div className="blog-post__meta" variants={FADE_UP}>
              <Badge variant="gold">{post.category}</Badge>
              <span className="blog-post__meta-item">
                <Calendar size={13} />
                {new Date(post.date).toLocaleDateString('en-IN', {
                  day: 'numeric', month: 'long', year: 'numeric'
                })}
              </span>
              <span className="blog-post__meta-item">
                <Clock size={13} /> {post.readTime}
              </span>
            </motion.div>

            <motion.h1 className="blog-post__title" variants={FADE_UP}>
              {post.title}
            </motion.h1>
            <div className="gold-divider" />
            <motion.p className="blog-post__excerpt" variants={FADE_UP}>
              {post.excerpt}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Article body */}
      <section className="section section--white">
        <div className="container">
          <div className="blog-post__layout">
            <article className="blog-post__content">
              {/* Placeholder content — replace with real CMS content */}
              <p>
                This is where the full article content will appear. Connect a headless CMS
                like Sanity or Contentful to populate this from <code>post.content</code>,
                or write the content directly in <code>src/data/blogPosts.js</code> as
                markdown/HTML strings and render them here.
              </p>
              <p>
                The excerpt for this post is: <em>{post.excerpt}</em>
              </p>
            </article>

            {/* Sidebar CTA */}
            <aside className="blog-post__sidebar">
              <div className="blog-post__sidebar-card">
                <h3 className="blog-post__sidebar-heading">
                  Have a project in mind?
                </h3>
                <p className="blog-post__sidebar-text">
                  We'd love to hear about it. Fill our 3-minute questionnaire
                  and we'll get back to you with a clear proposal.
                </p>
                <Link to="/start-project" className="btn btn--primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                  Start a Project →
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  )
}

export default BlogPostPage

const style = document.createElement('style')
style.textContent = `
.blog-post__hero {
  padding: var(--space-16) 0 var(--space-12);
  border-bottom: 1px solid var(--color-border);
}
.blog-post__hero-inner {
  max-width: 760px;
  display: flex; flex-direction: column; gap: var(--space-5);
}
.blog-post__back {
  display: inline-flex; align-items: center; gap: var(--space-2);
  font-family: var(--font-body); font-size: var(--text-sm); font-weight: 600;
  color: var(--color-text-secondary); text-decoration: none;
  transition: var(--transition-base);
}
.blog-post__back:hover { color: var(--color-gold); }
.blog-post__meta {
  display: flex; align-items: center; gap: var(--space-4); flex-wrap: wrap;
}
.blog-post__meta-item {
  display: flex; align-items: center; gap: var(--space-1);
  font-size: var(--text-xs); color: var(--color-text-muted); font-family: var(--font-body);
}
.blog-post__title {
  font-family: var(--font-display);
  font-size: clamp(1.75rem, 4vw, 3rem);
  font-weight: 700; color: var(--color-text-primary); line-height: 1.2;
}
.blog-post__excerpt {
  font-size: var(--text-lg); color: var(--color-text-secondary); line-height: 1.7;
}
.blog-post__layout {
  display: grid; grid-template-columns: 1fr 320px; gap: var(--space-12); align-items: start;
}
.blog-post__content {
  font-family: var(--font-body); font-size: var(--text-base);
  color: var(--color-text-secondary); line-height: 1.8;
  display: flex; flex-direction: column; gap: var(--space-6);
  max-width: 680px;
}
.blog-post__content p { font-size: var(--text-base); line-height: 1.8; }
.blog-post__sidebar { position: sticky; top: calc(var(--navbar-height) + var(--space-6)); }
.blog-post__sidebar-card {
  background: var(--color-gold-subtle); border: 1.5px solid var(--color-gold-border);
  border-radius: var(--radius-lg); padding: var(--space-6);
  display: flex; flex-direction: column; gap: var(--space-4);
}
.blog-post__sidebar-heading {
  font-family: var(--font-display); font-size: var(--text-xl);
  font-weight: 700; color: var(--color-text-primary);
}
.blog-post__sidebar-text {
  font-size: var(--text-sm); color: var(--color-text-secondary); line-height: 1.65;
}
@media (max-width: 860px) {
  .blog-post__layout { grid-template-columns: 1fr; }
  .blog-post__sidebar { position: static; }
}
`
if (!document.head.querySelector('[data-blog-post-styles]')) {
  style.setAttribute('data-blog-post-styles', '')
  document.head.appendChild(style)
}