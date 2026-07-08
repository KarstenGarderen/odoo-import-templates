import Icon from './Icon'

export default function StepModel({ module, selectedModel, onPick, onBack }) {
  return (
    <section className="step">
      <h1>What kind of records are you importing?</h1>
      <p className="step-intro">
        These are the record types you can import into <strong>{module.name}</strong>. The gray hint on each
        card tells you the recommended import order.
      </p>
      <div className="card-grid">
        {module.models.map((m) => (
          <button
            key={m.id}
            className={`card ${selectedModel?.id === m.id ? 'card-selected' : ''}`}
            onClick={() => onPick(m)}
          >
            <span className="card-icon">
              <Icon name={m.icon} size={26} />
            </span>
            <span className="card-title">{m.name}</span>
            <span className="card-desc">{m.description}</span>
            <span className="card-tech">{m.id}</span>
            {m.orderHint && <span className="card-hint">{m.orderHint}</span>}
          </button>
        ))}
      </div>
      <div className="step-actions">
        <button className="btn-secondary" onClick={onBack}>
          ← Back
        </button>
      </div>
    </section>
  )
}
