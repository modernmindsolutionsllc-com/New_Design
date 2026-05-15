import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { TrendingUp, Tag } from 'lucide-react'
import Badge from '@components/ui/Badge'
import CTABanner from '@components/home/CTABanner'
import { PORTFOLIO_ITEMS } from '@data/portfolio'
import { STAGGER_CONTAINER, FADE_UP } from '@utils/constants'

const CARD_COLORS = [
  'linear-gradient(135deg, #F9F3E3 0%, #EDD98A 100%)',
  'linear-gradient(135deg, #EAF3FB 0%, #B8D9F0 100%)',
  'linear-gradient(135deg, #F0F7F4 0%, #A8D5C2 100%)',
]

// Unique categories from data
const ALL_CATEGORIES = ['All', ...new Set(PORTFOLIO_ITEMS.map(p => p.category))]

const PortfolioPage = () => {
  const [activeFilter, setActiveFilter] = useState('All')
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  const filtered = activeFilter === 'All'
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter(p => p.category === activeFilter)

  return (
    <>
      {/* Page hero */}
      <section className="page-hero section--gray">
        <div className="container">
          <motion.div
            className="page-hero__inner"
            variants={STAGGER_CONTAINER}
            initial="hidden"
            animate="visible"
          >
            <motion.span className="section-tag" variants={FADE_UP}>Our Work</motion.span>
            <motion.h1 className="page-hero__heading" variants={FADE_UP}>
              Case Studies & Outcomes
            </motion.h1>
            <div className="gold-divider" />
            <motion.p className="page-hero__sub" variants={FADE_UP}>
              Real projects, measurable results, and practical implementation details.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Portfolio grid */}
      <section className="section section--white">
        <div className="container">
          {/* Filter tabs */}
          <motion.div
            className="portfolio-filters"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            {ALL_CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`portfolio-filter ${activeFilter === cat ? 'portfolio-filter--active' : ''}`}
                onClick={() => setActiveFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Cards */}
          <motion.div
            ref={ref}
            className="portfolio-page__grid"
            variants={STAGGER_CONTAINER}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <AnimatePresence mode="popLayout">
              {filtered.map(({ id, title, category, industry, problem, result, tags, image }, i) => (
                <motion.div
                  key={id}
                  className="portfolio-page-card"
                  variants={FADE_UP}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className="portfolio-page-card__image"
                    style={{ background: image ? `url(${image}) center/cover` : CARD_COLORS[i % CARD_COLORS.length] }}
                  >
                    <Badge variant="gold" className="portfolio-page-card__badge">{category}</Badge>
                  </div>

                  <div className="portfolio-page-card__body">
                    <div className="portfolio-page-card__meta">
                      <Tag size={12} />
                      <span>{industry}</span>
                    </div>

                    <h2 className="portfolio-page-card__title">{title}</h2>

                    <div className="portfolio-page-card__result">
                      <TrendingUp size={14} />
                      <span>{result}</span>
                    </div>

                    <p className="portfolio-page-card__problem">
                      <strong>Details:</strong> {problem}
                    </p>

                    <div className="portfolio-page-card__tags">
                      {tags.map(tag => (
                        <span key={tag} className="portfolio-page-card__tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div className="portfolio-page__empty">
              <p>No items in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      <CTABanner />
    </>
  )
}

export default PortfolioPage

const style = document.createElement('style')
style.textContent = `
.portfolio-filters {
  display: flex; flex-wrap: wrap; gap: var(--space-3);
  margin-bottom: var(--space-10);
}
.portfolio-filter {
  font-family: var(--font-body); font-size: var(--text-sm); font-weight: 600;
  color: var(--color-text-secondary);
  background: var(--color-bg-white); border: 1.5px solid var(--color-border);
  padding: var(--space-2) var(--space-5); border-radius: var(--radius-full);
  cursor: pointer; transition: var(--transition-base);
}
.portfolio-filter:hover { border-color: var(--color-gold-border); color: var(--color-gold-dark); }
.portfolio-filter--active {
  background: var(--color-gold); border-color: var(--color-gold);
  color: var(--color-bg-dark);
}
.portfolio-page__grid {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-6);
}
.portfolio-page-card {
  background: #e2e8f0; border: 1px solid var(--color-border);
  border-radius: var(--radius-lg); overflow: hidden;
  transition: var(--transition-slow);
}

:root[data-theme='dark'] .portfolio-page-card {
  background: var(--color-bg-white);
}
.portfolio-page-card:hover {
  border-color: var(--color-gold-border);
  box-shadow: var(--shadow-card-hover);
  transform: translateY(-4px);
}
.portfolio-page-card__image {
  height: 200px; position: relative;
  display: flex; align-items: flex-start;
  padding: var(--space-5);
}
.portfolio-page-card__badge { position: absolute; top: var(--space-4); left: var(--space-4); }
.portfolio-page-card__body {
  padding: var(--space-6);
  display: flex; flex-direction: column; gap: var(--space-3);
}
.portfolio-page-card__meta {
  display: flex; align-items: center; gap: var(--space-2);
  font-size: var(--text-xs); color: var(--color-text-muted);
  font-family: var(--font-body);
}
.portfolio-page-card__title {
  font-family: var(--font-display); font-size: var(--text-xl);
  font-weight: 700; color: var(--color-text-primary); line-height: 1.3;
}
.portfolio-page-card__result {
  display: flex; align-items: center; gap: var(--space-2);
  font-size: var(--text-sm); font-weight: 600; color: var(--color-success);
  font-family: var(--font-body);
}
.portfolio-page-card__problem {
  font-size: var(--text-sm); color: var(--color-text-secondary); line-height: 1.6;
}
.portfolio-page-card__tags { display: flex; flex-wrap: wrap; gap: var(--space-2); }
.portfolio-page-card__tag {
  font-size: var(--text-xs); background: var(--color-bg-subtle);
  border: 1px solid var(--color-border); color: var(--color-text-secondary);
  padding: 0.2rem 0.6rem; border-radius: var(--radius-full);
  font-family: var(--font-body);
}
.portfolio-page__empty {
  text-align: center; padding: var(--space-16);
  color: var(--color-text-muted); font-family: var(--font-body);
}
@media (max-width: 900px) { .portfolio-page__grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 560px) { .portfolio-page__grid { grid-template-columns: 1fr; } }
`
if (!document.head.querySelector('[data-port-page-styles]')) {
  style.setAttribute('data-port-page-styles', '')
  document.head.appendChild(style)
}


