import { useMemo, useState } from 'react'
import { ODOO_VERSIONS, fieldsForVersion, defaultSelection } from '../data/registry'

function HelpTip({ text }) {
  const [open, setOpen] = useState(false)
  return (
    <span
      className="help-wrap"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className="help-icon"
        aria-expanded={open}
        aria-label="Field explanation"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setOpen((v) => !v)
        }}
      >
        ?
      </button>
      {open && (
        <span role="tooltip" className="help-tip">
          {text}
        </span>
      )}
    </span>
  )
}

const TYPE_BADGES = {
  char: 'text',
  text: 'text',
  boolean: 'yes/no',
  integer: 'number',
  float: 'number',
  selection: 'list',
  many2one: 'link',
  many2many: 'links',
}

export default function StepFields({
  model,
  version,
  onVersionChange,
  selected,
  onSelectedChange,
  onBack,
  onNext,
}) {
  const [query, setQuery] = useState('')

  const fields = useMemo(() => fieldsForVersion(model, version), [model, version])

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return fields
    return fields.filter(
      (f) =>
        f.label.toLowerCase().includes(q) ||
        f.name.toLowerCase().includes(q) ||
        (f.help || '').toLowerCase().includes(q)
    )
  }, [fields, query])

  const byGroup = useMemo(() => {
    const map = new Map()
    for (const g of model.groups) map.set(g, [])
    for (const f of visible) {
      if (!map.has(f.group)) map.set(f.group, [])
      map.get(f.group).push(f)
    }
    return [...map.entries()].filter(([, list]) => list.length > 0)
  }, [model, visible])

  const toggle = (field) => {
    if (field.required) return
    const next = new Set(selected)
    if (next.has(field.name)) next.delete(field.name)
    else next.add(field.name)
    onSelectedChange(next)
  }

  const setGroup = (groupFields, checked) => {
    const next = new Set(selected)
    for (const f of groupFields) {
      if (f.required) continue
      if (checked) next.add(f.name)
      else next.delete(f.name)
    }
    // required fields always stay selected
    for (const f of fields) if (f.required) next.add(f.name)
    onSelectedChange(next)
  }

  const reset = () => onSelectedChange(defaultSelection(model, version))
  const count = fields.filter((f) => selected.has(f.name)).length

  return (
    <section className="step step-wide">
      <h1>
        Choose the fields for your {model.name.toLowerCase()} template
      </h1>
      <p className="step-intro">
        Required fields are always included. We pre-selected the fields most imports need — add or remove
        anything you like. Click the <span className="help-icon-inline">?</span> for an explanation.
      </p>

      {model.importMechanic && <div className="mechanic-note">{model.importMechanic}</div>}

      <div className="fields-toolbar">
        <div className="version-toggle" role="radiogroup" aria-label="Odoo version">
          <span className="version-label">My Odoo version:</span>
          {ODOO_VERSIONS.map((v) => (
            <button
              key={v}
              className={`version-btn ${version === v ? 'active' : ''}`}
              onClick={() => onVersionChange(v)}
            >
              Odoo {v}
            </button>
          ))}
        </div>
        <input
          type="search"
          className="field-search"
          placeholder="Search fields…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn-link" onClick={reset}>
          Reset to recommended
        </button>
      </div>

      {byGroup.map(([group, groupFields]) => {
        const allOn = groupFields.every((f) => selected.has(f.name))
        return (
          <div key={group} className="field-group">
            <div className="field-group-head">
              <h2>{group}</h2>
              <button className="btn-link" onClick={() => setGroup(groupFields, !allOn)}>
                {allOn ? 'Deselect all' : 'Select all'}
              </button>
            </div>
            <div className="field-list">
              {groupFields.map((f) => (
                <label
                  key={f.name}
                  className={`field-row ${selected.has(f.name) ? 'on' : ''} ${f.required ? 'required' : ''}`}
                >
                  <input
                    type="checkbox"
                    checked={selected.has(f.name)}
                    disabled={f.required}
                    onChange={() => toggle(f)}
                  />
                  <span className="field-label">
                    {f.label}
                    {f.required && <span className="req-star" title="Required by Odoo">*</span>}
                  </span>
                  <code className="field-tech">{f.name}</code>
                  <span className={`type-badge t-${f.type}`}>{TYPE_BADGES[f.type] || f.type}</span>
                  {(f.help || f.importNote) && (
                    <HelpTip text={[f.help, f.importNote].filter(Boolean).join('\n\n')} />
                  )}
                </label>
              ))}
            </div>
          </div>
        )
      })}

      {visible.length === 0 && (
        <p className="empty-state">No fields match “{query}”. Try a different search term.</p>
      )}

      <div className="step-actions sticky">
        <button className="btn-secondary" onClick={onBack}>
          ← Back
        </button>
        <span className="selection-count">
          {count} field{count === 1 ? '' : 's'} selected
        </span>
        <button className="btn-primary" onClick={onNext} disabled={count === 0}>
          Continue →
        </button>
      </div>
    </section>
  )
}
