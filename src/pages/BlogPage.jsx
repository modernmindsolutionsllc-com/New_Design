import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import { Clock, ArrowRight } from 'lucide-react'
import Badge from '@components/ui/Badge'
import { BLOG_POSTS } from '@data/blogPosts'
import { STAGGER_CONTAINER, FADE_UP } from '@utils/constants'

const BlogPage = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <>
      {/* Page hero */}
      <section className="page-hero section--gray">
        <div className="container">
          <motion.div className="page-hero__inner" variants={STAGGER_CONTAINER} initial="hidden" animate="visible">
            <motion.span className="section-tag" variants={FADE_UP}>Helpful Reads</motion.span>
            <motion.h1 className="page-hero__heading" variants={FADE_UP}>The Blog</motion.h1>
            <div className="gold-divider" />
            <motion.p className="page-hero__sub" variants={FADE_UP}>
              Plain-language guides for business owners navigating software decisions.
              No tech jargon — just practical, honest advice.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="section section--white">
        <div className="container">
          <motion.div
            ref={ref}
            className="blog-page__grid"
            variants={STAGGER_CONTAINER}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            {BLOG_POSTS.map(({ id, slug, title, category, date, excerpt, readTime }) => (
              <motion.article key={id} className="blog-page-card" variants={FADE_UP}>
                <div className="blog-page-card__top">
                  <Badge variant="gold">{category}</Badge>
                  <span className="blog-page-card__date">
                    {new Date(date).toLocaleDateString('en-IN', {
                      day: 'numeric', month: 'long', year: 'numeric'
                    })}
                  </span>
                </div>
                <h2 className="blog-page-card__title">{title}</h2>
                <p className="blog-page-card__excerpt">{excerpt}</p>
                <div className="blog-page-card__footer">
                  <span className="blog-page-card__read-time">
                    <Clock size={13} /> {readTime}
                  </span>
                  <Link to={`/blog/${slug}`} className="blog-page-card__link">
                    Read Article <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default BlogPage

const style = document.createElement('style')
style.textContent = `
.blog-page__grid {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-6);
}
.blog-page-card {
  background: var(--color-bg-white); border: 1px solid var(--color-border);
  border-radius: var(--radius-lg); padding: var(--space-8);
  display: flex; flex-direction: column; gap: var(--space-4);
  transition: var(--transition-slow);
}
.blog-page-card:hover {
  border-color: var(--color-gold-border);
  box-shadow: var(--shadow-card-hover);
  transform: translateY(-3px);
}
.blog-page-card__top {
  display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: var(--space-2);
}
.blog-page-card__date { font-size: var(--text-xs); color: var(--color-text-muted); font-family: var(--font-body); }
.blog-page-card__title {
  font-family: var(--font-display); font-size: var(--text-xl);
  font-weight: 700; color: var(--color-text-primary); line-height: 1.3; flex: 1;
}
.blog-page-card__excerpt {
  font-size: var(--text-sm); color: var(--color-text-secondary); line-height: 1.7;
}
.blog-page-card__footer {
  display: flex; justify-content: space-between; align-items: center;
  padding-top: var(--space-4); border-top: 1px solid var(--color-border); margin-top: auto;
}
.blog-page-card__read-time {
  display: flex; align-items: center; gap: var(--space-1);
  font-size: var(--text-xs); color: var(--color-text-muted); font-family: var(--font-body);
}
.blog-page-card__link {
  display: inline-flex; align-items: center; gap: var(--space-2);
  font-size: var(--text-sm); font-weight: 600;
  color: var(--color-gold); text-decoration: none; transition: var(--transition-base);
}
.blog-page-card__link:hover { color: var(--color-gold-dark); }
@media (max-width: 900px) { .blog-page__grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 560px) { .blog-page__grid { grid-template-columns: 1fr; } }
`
if (!document.head.querySelector('[data-blog-page-styles]')) {
  style.setAttribute('data-blog-page-styles', '')
  document.head.appendChild(style)
}