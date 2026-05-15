import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import { ArrowRight, Clock } from 'lucide-react'
import SectionHeading from '@components/ui/SectionHeading'
import Badge from '@components/ui/Badge'
import { BLOG_POSTS } from '@data/blogPosts'
import { STAGGER_CONTAINER, FADE_UP } from '@utils/constants'

const BlogPreview = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section className="blog-preview section section--white" id="blog">
      <div className="container">
        <div className="blog-preview__header">
          <SectionHeading
            tag="Insights"
            heading="Ideas, Product, and Growth"
            subline="Simple explanations for founders and teams planning digital products."
          />
          <Link to="/blog" className="btn btn--ghost blog-preview__all-link">
            Read All Articles <ArrowRight size={16} />
          </Link>
        </div>

        <motion.div
          ref={ref}
          className="blog-preview__grid"
          variants={STAGGER_CONTAINER}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {BLOG_POSTS.map(({ id, slug, title, category, date, excerpt, readTime }) => (
            <motion.div key={id} className="blog-card" variants={FADE_UP}>
              <div className="blog-card__top">
                <Badge variant="gold">{category}</Badge>
                <span className="blog-card__date">
                  {new Date(date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
              </div>
              <h3 className="blog-card__title">{title}</h3>
              <p className="blog-card__excerpt">{excerpt}</p>
              <div className="blog-card__footer">
                <span className="blog-card__read-time">
                  <Clock size={13} /> {readTime}
                </span>
                <Link to={`/blog/${slug}`} className="blog-card__link">
                  Read Article <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default BlogPreview

const style = document.createElement('style')
style.textContent = `
.blog-preview__header {
  display: flex; justify-content: space-between; align-items: flex-end;
  gap: var(--space-6); margin-bottom: var(--space-12); flex-wrap: wrap;
}
.blog-preview__all-link { display: inline-flex; align-items: center; gap: var(--space-2); flex-shrink: 0; }
.blog-preview__grid {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-6);
}
.blog-card {
  background: var(--color-bg-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-8);
  display: flex; flex-direction: column; gap: var(--space-4);
  transition: var(--transition-slow);
}
.blog-card:hover {
  border-color: var(--color-gold-border);
  box-shadow: var(--shadow-card-hover);
  transform: translateY(-3px);
}
.blog-card__top {
  display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: var(--space-2);
}
.blog-card__date { font-size: var(--text-xs); color: var(--color-text-muted); font-family: var(--font-body); }
.blog-card__title {
  font-family: var(--font-display); font-size: var(--text-xl);
  font-weight: 700; color: var(--color-text-primary); line-height: 1.3; flex: 1;
}
.blog-card__excerpt {
  font-size: var(--text-sm); color: var(--color-text-secondary); line-height: 1.65;
}
.blog-card__footer {
  display: flex; justify-content: space-between; align-items: center;
  margin-top: auto; padding-top: var(--space-4);
  border-top: 1px solid var(--color-border);
}
.blog-card__read-time {
  display: flex; align-items: center; gap: var(--space-1);
  font-size: var(--text-xs); color: var(--color-text-muted); font-family: var(--font-body);
}
.blog-card__link {
  display: inline-flex; align-items: center; gap: var(--space-2);
  font-size: var(--text-sm); font-weight: 600; color: var(--color-gold); text-decoration: none;
  transition: var(--transition-base);
}
.blog-card__link:hover { color: var(--color-gold-dark); }
@media (max-width: 900px) { .blog-preview__grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 560px) { .blog-preview__grid { grid-template-columns: 1fr; } }
`
if (!document.head.querySelector('[data-blog-styles]')) {
  style.setAttribute('data-blog-styles', '')
  document.head.appendChild(style)
}

