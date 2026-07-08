import Icon from './Icon'

export default function StepModule({ modules, onPick }) {
  return (
    <section className="step">
      <h1>Which part of Odoo do you want to import data into?</h1>
      <p className="step-intro">Pick the app your data belongs to. More apps are coming soon.</p>
      <div className="card-grid">
        {modules.map((m) => (
          <button key={m.id} className="card" onClick={() => onPick(m)}>
            <span className="card-icon">
              <Icon name={m.icon} size={26} />
            </span>
            <span className="card-title">{m.name}</span>
            <span className="card-desc">{m.description}</span>
            <span className="card-meta">
              {m.models.length} record type{m.models.length === 1 ? '' : 's'}
            </span>
            <span className="card-cta">Choose {m.name} →</span>
          </button>
        ))}
      </div>
    </section>
  )
}
