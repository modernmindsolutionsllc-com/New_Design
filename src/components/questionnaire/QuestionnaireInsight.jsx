import { Lightbulb, Sparkles } from 'lucide-react'

const QuestionnaireInsight = ({ insight }) => {
  if (!insight) return null

  return (
    <aside className="questionnaire-insight" aria-live="polite">
      <div className="questionnaire-insight__header">
        <span className="questionnaire-insight__badge">
          <Sparkles size={14} />
          {insight.badge}
        </span>
        <h3 className="questionnaire-insight__title">{insight.title}</h3>
        <p className="questionnaire-insight__copy">{insight.copy}</p>
      </div>

      {insight.suggestions?.length ? (
        <div className="questionnaire-insight__body">
          <div className="questionnaire-insight__section-label">
            <Lightbulb size={14} />
            Smart suggestions
          </div>
          <ul className="questionnaire-insight__list">
            {insight.suggestions.map((item) => (
              <li key={item} className="questionnaire-insight__item">{item}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="questionnaire-insight__footer">
        <span className="questionnaire-insight__next-label">Up next</span>
        <p className="questionnaire-insight__next-copy">{insight.nextTeaser}</p>
      </div>
    </aside>
  )
}

export default QuestionnaireInsight
