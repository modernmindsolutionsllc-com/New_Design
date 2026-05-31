const RouteLoader = () => (
  <div className="route-loader" role="status" aria-live="polite" aria-label="Loading page">
    <div className="route-loader__spinner" aria-hidden />
    <p className="route-loader__text">Loading page…</p>
  </div>
)

export default RouteLoader

const style = document.createElement('style')
style.textContent = `
.route-loader {
  min-height: calc(100vh - var(--navbar-height));
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-4);
  padding: var(--space-12) var(--space-4);
  background: linear-gradient(180deg, var(--color-bg) 0%, color-mix(in srgb, var(--color-bg-subtle) 40%, var(--color-bg) 60%) 100%);
}
.route-loader__spinner {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  border: 3px solid color-mix(in srgb, var(--color-border) 84%, transparent 16%);
  border-top-color: var(--color-gold);
  animation: spin 0.9s linear infinite;
}
.route-loader__text {
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-text-secondary);
}
`
if (!document.head.querySelector('[data-route-loader-styles]')) {
  style.setAttribute('data-route-loader-styles', '')
  document.head.appendChild(style)
}
