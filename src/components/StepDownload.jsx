import { useMemo, useState } from 'react'
import { fieldsForVersion } from '../data/registry'
import { downloadTemplate } from '../excel/buildTemplate'
import { generateImportScript } from '../python/buildScript'

export default function StepDownload({ model, version, selected, onBack, onRestart, onShowTips }) {
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState(null)
  const [error, setError] = useState(null)
  const [copied, setCopied] = useState(false)

  const fields = useMemo(
    () => fieldsForVersion(model, version).filter((f) => selected.has(f.name)),
    [model, version, selected]
  )

  const script = useMemo(
    () => generateImportScript({ model, fields, version }),
    [model, fields, version]
  )

  const copyScript = async () => {
    let ok = false
    try {
      await navigator.clipboard.writeText(script)
      ok = true
    } catch {
      // Fallback for browsers/contexts without async clipboard permission
      const ta = document.createElement('textarea')
      ta.value = script
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      try {
        ok = document.execCommand('copy')
      } catch {
        ok = false
      }
      document.body.removeChild(ta)
    }
    if (ok) {
      setError(null)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } else {
      // Last resort: select the code so the visitor only has to press Ctrl/Cmd+C
      const codeEl = document.querySelector('.code-block code')
      if (codeEl) {
        const range = document.createRange()
        range.selectNodeContents(codeEl)
        const sel = window.getSelection()
        sel.removeAllRanges()
        sel.addRange(range)
      }
      setError('Clipboard access was blocked — the code is now selected, press Ctrl/Cmd+C to copy it.')
    }
  }

  const handleDownload = async () => {
    setBusy(true)
    setError(null)
    try {
      const filename = await downloadTemplate({ model, fields, version })
      setDone(filename)
    } catch (e) {
      console.error(e)
      setError('Something went wrong while generating the file. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="step step-wide">
      <h1>Your template is ready</h1>
      <p className="step-intro">
        <strong>{model.name}</strong> import template for <strong>Odoo {version}</strong> with{' '}
        <strong>{fields.length}</strong> fields. The first row below shows the column headers, the second an
        example record — replace or delete it before importing.
      </p>

      <div className="preview-scroll">
        <table className="preview-table">
          <thead>
            <tr>
              {fields.map((f) => (
                <th key={f.name} className={f.required ? 'req' : ''} title={f.label}>
                  {f.name}
                </th>
              ))}
            </tr>
            <tr className="label-row">
              {fields.map((f) => (
                <td key={f.name}>{f.label}</td>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="example-row">
              {fields.map((f) => (
                <td key={f.name}>{String(f.example ?? '')}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <div className="download-box">
        <button className="btn-primary btn-big" onClick={handleDownload} disabled={busy}>
          {busy ? 'Generating…' : `⬇ Download ${model.slug} template (.xlsx)`}
        </button>
        {done && <p className="download-done">✓ Downloaded <strong>{done}</strong></p>}
        {error && <p className="download-error">{error}</p>}
      </div>

      <div className="howto">
        <h2>How to import it in Odoo</h2>
        <ol>
          <li>Fill the “Import Template” sheet with your data — one row per record. Delete the example row.</li>
          <li>
            Delete columns you don’t need. An <em>empty cell</em> in a kept column clears that field in Odoo —
            it does not apply the default.
          </li>
          <li>
            In Odoo, open{' '}
            <strong>{model.slug === 'products' ? 'Sales → Products → Products' : 'Contacts'}</strong>.
          </li>
          <li>Click the ⚙ gear icon → <strong>Import records</strong> and upload the file.</li>
          <li>Columns map automatically (they use Odoo’s technical field names). Review the preview.</li>
          <li>Click <strong>Test</strong> first; when everything is green, click <strong>Import</strong>.</li>
          <li>
            Imports can’t be undone: make a database backup first and start with a small test batch (e.g. 10
            rows) before importing everything.
          </li>
        </ol>
        <p className="howto-note">
          The full instructions — including every field’s meaning and allowed values — are also inside the
          file on the “Instructions” sheet.{' '}
          <button className="btn-link" onClick={onShowTips}>
            Read all import tips &amp; best practices →
          </button>
        </p>
      </div>

      <details className="dev-section">
        <summary>For developers: import this template with Python</summary>
        <div className="dev-body">
          <p>
            Prefer scripting the import — for repeat migrations or many files? This script reads the
            downloaded template and imports it through Odoo’s own import engine, so the External ID column
            gives the same safe re-run behavior: running it twice updates instead of duplicating.
          </p>
          <ol>
            <li>
              Install the one dependency: <code>pip install openpyxl</code>
            </li>
            <li>
              Create an API key in Odoo: your avatar → <strong>My Profile</strong> →{' '}
              <strong>Account Security</strong> → <strong>New API Key</strong>.
            </li>
            <li>
              Edit the <code>URL</code>, <code>DB</code> and <code>USERNAME</code> lines, then run:{' '}
              <code>python import_{model.slug.replace(/-/g, '_')}.py</code>. Start with{' '}
              <code>LIMIT = 10</code> as a test.
            </li>
          </ol>
          <div className="code-header">
            <span className="code-filename">import_{model.slug.replace(/-/g, '_')}.py</span>
            <button className="btn-copy" onClick={copyScript}>
              {copied ? '✓ Copied' : 'Copy script'}
            </button>
          </div>
          <pre className="code-block">
            <code>{script}</code>
          </pre>
        </div>
      </details>

      <div className="step-actions">
        <button className="btn-secondary" onClick={onBack}>
          ← Adjust fields
        </button>
        <button className="btn-link" onClick={onRestart}>
          Start over
        </button>
      </div>
    </section>
  )
}
