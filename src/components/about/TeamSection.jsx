import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Linkedin, Github } from 'lucide-react'
import SectionHeading from '@components/ui/SectionHeading'
import { TEAM } from '@data/team'
import { STAGGER_CONTAINER, FADE_UP } from '@utils/constants'

const TeamSection = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section className="team section section--gray">
      <div className="container">
        <SectionHeading
          tag="Our Team"
          heading="Execution Team You Can Count On"
          subline="A cross-functional team of strategists, designers, and engineers focused on business impact."
          align="center"
        />

        <motion.div
          ref={ref}
          className="team__grid"
          variants={STAGGER_CONTAINER}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {TEAM.map(({ id, name, role, bio, avatar, initials, linkedin, github }) => (
            <motion.div key={id} className="team-card" variants={FADE_UP}>
              {/* Avatar */}
              <div className="team-card__avatar-wrap">
                {avatar ? (
                  <img src={avatar} alt={name} className="team-card__avatar" />
                ) : (
                  <div className="team-card__avatar team-card__avatar--initials">
                    {initials}
                  </div>
                )}
                {/* Gold ring accent */}
                <div className="team-card__avatar-ring" aria-hidden />
              </div>

              <div className="team-card__body">
                <h3 className="team-card__name">{name}</h3>
                <p className="team-card__role">{role}</p>
                <div className="gold-divider" />
                <p className="team-card__bio">{bio}</p>
              </div>

              {/* Social links */}
              <div className="team-card__socials">
                {linkedin && (
                  <a href={linkedin} target="_blank" rel="noopener noreferrer"
                    className="team-card__social-link" aria-label={`${name} on LinkedIn`}>
                    <Linkedin size={16} />
                  </a>
                )}
                {github && (
                  <a href={github} target="_blank" rel="noopener noreferrer"
                    className="team-card__social-link" aria-label={`${name} on GitHub`}>
                    <Github size={16} />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default TeamSection

const style = document.createElement('style')
style.textContent = `
.team__grid {
  display: grid; grid-template-columns: minmax(240px, 360px);
  justify-content: center;
  gap: var(--space-6); margin-top: var(--space-12);
}
.team-card {
  background: var(--color-bg-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-8) var(--space-6);
  display: flex; flex-direction: column; align-items: center;
  gap: var(--space-5); text-align: center;
  transition: var(--transition-slow);
}
.team-card:hover {
  border-color: var(--color-gold-border);
  box-shadow: var(--shadow-card-hover);
  transform: translateY(-4px);
}
.team-card__avatar-wrap { position: relative; }
.team-card__avatar {
  width: 88px; height: 88px;
  border-radius: 50%; object-fit: cover;
}
.team-card__avatar--initials {
  background: var(--color-bg-dark);
  color: var(--color-gold);
  font-family: var(--font-display);
  font-size: var(--text-2xl); font-weight: 700;
  display: flex; align-items: center; justify-content: center;
}
.team-card__avatar-ring {
  position: absolute; inset: -4px;
  border-radius: 50%;
  border: 2px solid var(--color-gold-border);
  transition: border-color 0.3s;
}
.team-card:hover .team-card__avatar-ring {
  border-color: var(--color-gold);
}
.team-card__body { display: flex; flex-direction: column; align-items: center; width: 100%; }
.team-card__name {
  font-family: var(--font-body); font-size: var(--text-lg);
  font-weight: 700; color: var(--color-text-primary);
}
.team-card__role {
  font-size: var(--text-sm); color: var(--color-gold-dark);
  font-weight: 500; margin-top: var(--space-1);
  font-family: var(--font-body);
}
.team-card .gold-divider { margin: var(--space-4) auto; }
.team-card__bio {
  font-size: var(--text-sm); color: var(--color-text-secondary);
  line-height: 1.65;
}
.team-card__socials {
  display: flex; gap: var(--space-3); margin-top: auto;
}
.team-card__social-link {
  width: 36px; height: 36px; border-radius: 50%;
  background: var(--color-bg-subtle);
  border: 1px solid var(--color-border);
  color: var(--color-text-secondary);
  display: flex; align-items: center; justify-content: center;
  transition: var(--transition-base); text-decoration: none;
}
.team-card__social-link:hover {
  background: var(--color-gold-subtle);
  border-color: var(--color-gold-border);
  color: var(--color-gold);
}
@media (max-width: 1024px) { .team__grid { grid-template-columns: minmax(220px, 360px); } }
@media (max-width: 560px) { .team__grid { grid-template-columns: 1fr; } }
`
if (!document.head.querySelector('[data-team-styles]')) {
  style.setAttribute('data-team-styles', '')
  document.head.appendChild(style)
}
