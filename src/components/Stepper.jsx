export default function Stepper({ steps, current, onNavigate }) {
  return (
    <nav className="stepper" aria-label="Progress">
      {steps.map((label, i) => {
        const state = i < current ? 'done' : i === current ? 'active' : 'todo'
        return (
          <button
            key={label}
            className={`stepper-step ${state}`}
            onClick={() => onNavigate(i)}
            disabled={i >= current}
          >
            <span className="stepper-dot">{i < current ? '✓' : i + 1}</span>
            <span className="stepper-label">{label}</span>
          </button>
        )
      })}
    </nav>
  )
}
