import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ArrowRight, TrendingUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import SectionHeading from '@components/ui/SectionHeading'
import Badge from '@components/ui/Badge'
import { PORTFOLIO_ITEMS } from '@data/portfolio'
import { STAGGER_CONTAINER, FADE_UP } from '@utils/constants'

// Placeholder colours for project cards without images
const CARD_COLORS = [
  'linear-gradient(135deg, #F9F3E3 0%, #EDD98A 100%)',
  'linear-gradient(135deg, #EAF3FB 0%, #B8D9F0 100%)',
  'linear-gradient(135deg, #F0F7F4 0%, #A8D5C2 100%)',
]

const PortfolioPreview = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section className="portfolio-preview section section--white" id="work">
      <div className="container">
        <div className="portfolio-preview__header">
          <SectionHeading
            tag="Our Work"
            heading="Case Studies at a Glance"
            subline="A quick look at the digital products and platform outcomes we have delivered."
          />
          <Link to="/portfolio" className="btn btn--ghost portfolio-preview__all-link">
            View Full Portfolio <ArrowRight size={16} />
          </Link>
        </div>

        <motion.div
          ref={ref}
          className="portfolio-preview__grid"
          variants={STAGGER_CONTAINER}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {PORTFOLIO_ITEMS.map(({ id, title, category, industry, problem, result, tags, image }, i) => (
            <motion.div key={id} className="portfolio-card" variants={FADE_UP}>
              {/* Image / placeholder */}
              <div
                className="portfolio-card__image"
                style={{ background: image ? `url(${image}) center/cover` : CARD_COLORS[i % CARD_COLORS.length] }}
              >
                <div className="portfolio-card__image-overlay" />
              </div>

              <div className="portfolio-card__body">
                <div className="portfolio-card__meta">
                  <Badge variant="gold">{category}</Badge>
                  <span className="portfolio-card__industry">{industry}</span>
                </div>

                <h3 className="portfolio-card__title">{title}</h3>

                <div className="portfolio-card__result">
                  <TrendingUp size={14} className="portfolio-card__result-icon" />
                  <span>{result}</span>
                </div>

                <p className="portfolio-card__problem">
                  <strong>Overview:</strong> {problem}
                </p>

                <div className="portfolio-card__tags">
                  {tags.map((tag) => (
                    <span key={tag} className="portfolio-card__tag">{tag}</span>
                  ))}
                </div>

                <Link to={`/portfolio`} className="portfolio-card__link">
                  Learn Details <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default PortfolioPreview

const style = document.createElement('style')
style.textContent = `
.portfolio-preview__header {
  display: flex; justify-content: space-between; align-items: flex-end;
  gap: var(--space-6); margin-bottom: var(--space-12); flex-wrap: wrap;
}
.portfolio-preview__all-link {
  display: inline-flex; align-items: center; gap: var(--space-2);
  flex-shrink: 0;
}
.portfolio-preview__grid {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-6);
}
.portfolio-card {
  background: var(--color-bg-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: var(--transition-slow);
  display: flex; flex-direction: column;
}
.portfolio-card:hover {
  border-color: var(--color-gold-border);
  box-shadow: var(--shadow-card-hover);
  transform: translateY(-4px);
}
.portfolio-card__image {
  height: 180px; position: relative; flex-shrink: 0;
}
.portfolio-card__image-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to bottom, transparent 40%, rgba(30,30,46,0.08));
}
.portfolio-card__body {
  padding: var(--space-6);
  display: flex; flex-direction: column; gap: var(--space-3); flex: 1;
}
.portfolio-card__meta {
  display: flex; align-items: center; gap: var(--space-3); flex-wrap: wrap;
}
.portfolio-card__industry {
  font-size: var(--text-xs); color: var(--color-text-muted);
  font-family: var(--font-body);
}
.portfolio-card__title {
  font-family: var(--font-display);
  font-size: var(--text-lg); font-weight: 700;
  color: var(--color-text-primary); line-height: 1.3;
}
.portfolio-card__result {
  display: flex; align-items: center; gap: var(--space-2);
  font-size: var(--text-sm); font-weight: 600;
  color: var(--color-success);
}
.portfolio-card__result-icon { flex-shrink: 0; }
.portfolio-card__problem {
  font-size: var(--text-sm); color: var(--color-text-secondary);
  line-height: 1.55;
}
.portfolio-card__tags {
  display: flex; flex-wrap: wrap; gap: var(--space-2); margin-top: auto;
}
.portfolio-card__tag {
  font-size: var(--text-xs); font-family: var(--font-body);
  background: var(--color-bg-subtle); color: var(--color-text-secondary);
  border: 1px solid var(--color-border);
  padding: 0.2rem 0.6rem; border-radius: var(--radius-full);
}
.portfolio-card__link {
  display: inline-flex; align-items: center; gap: var(--space-2);
  font-size: var(--text-sm); font-weight: 600; color: var(--color-gold);
  text-decoration: none; transition: var(--transition-base);
}
.portfolio-card__link:hover { color: var(--color-gold-dark); }
@media (max-width: 900px) { .portfolio-preview__grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 560px) { .portfolio-preview__grid { grid-template-columns: 1fr; } }
`
if (!document.head.querySelector('[data-pp-styles]')) {
  style.setAttribute('data-pp-styles', '')
  document.head.appendChild(style)
}
