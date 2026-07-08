import { useState } from 'react'
import { MODULES, DEFAULT_VERSION, defaultSelection } from './data/registry'
import Stepper from './components/Stepper'
import StepModule from './components/StepModule'
import StepModel from './components/StepModel'
import StepFields from './components/StepFields'
import StepDownload from './components/StepDownload'
import ImportTips from './components/ImportTips'
import Icon from './components/Icon'

const STEPS = ['Module', 'Model', 'Fields', 'Download']

export default function App() {
  const [step, setStep] = useState(0)
  const [showTips, setShowTips] = useState(false)
  const [module, setModule] = useState(null)
  const [model, setModel] = useState(null)
  const [version, setVersion] = useState(DEFAULT_VERSION)
  const [selected, setSelected] = useState(new Set())

  const pickModule = (m) => {
    setModule(m)
    if (m.models.length === 1) {
      // Only one model in this module: pre-select it but still show the step
      setModel(m.models[0])
      setSelected(defaultSelection(m.models[0], version))
    } else {
      setModel(null)
    }
    setStep(1)
  }

  const pickModel = (m) => {
    setModel(m)
    setSelected(defaultSelection(m, version))
    setStep(2)
  }

  const changeVersion = (v) => {
    setVersion(v)
    if (model) setSelected(defaultSelection(model, v))
  }

  const restart = () => {
    setStep(0)
    setModule(null)
    setModel(null)
    setSelected(new Set())
    setShowTips(false)
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="brand" onClick={restart} role="button" tabIndex={0}>
          <span className="brand-mark">
            <Icon name="logo" size={30} />
          </span>
          <span>
            <strong>Odoo Import Templates</strong>
            <small>Build a ready-to-fill Excel import file in four steps</small>
          </span>
        </div>
        <div className="header-right">
          <button
            className={`btn-tips ${showTips ? 'active' : ''}`}
            onClick={() => setShowTips((v) => !v)}
          >
            <Icon name="bulb" size={15} /> Import tips
          </button>
          <span className="badge-versions">Odoo 18 &amp; 19</span>
        </div>
      </header>

      {!showTips && (
        <Stepper steps={STEPS} current={step} onNavigate={(i) => i < step && setStep(i)} />
      )}

      <main className="app-main">
        {showTips && <ImportTips onBack={() => setShowTips(false)} />}
        {!showTips && step === 0 && <StepModule modules={MODULES} onPick={pickModule} />}
        {!showTips && step === 1 && module && (
          <StepModel module={module} selectedModel={model} onPick={pickModel} onBack={() => setStep(0)} />
        )}
        {!showTips && step === 2 && model && (
          <StepFields
            model={model}
            version={version}
            onVersionChange={changeVersion}
            selected={selected}
            onSelectedChange={setSelected}
            onBack={() => setStep(1)}
            onNext={() => setStep(3)}
          />
        )}
        {!showTips && step === 3 && model && (
          <StepDownload
            model={model}
            version={version}
            selected={selected}
            onBack={() => setStep(2)}
            onRestart={restart}
            onShowTips={() => setShowTips(true)}
          />
        )}
      </main>

      <footer className="app-footer">
        Free template generator for Odoo 18 &amp; 19 · Column names use Odoo's technical field names so the
        import maps automatically · No data leaves your browser
      </footer>
    </div>
  )
}
