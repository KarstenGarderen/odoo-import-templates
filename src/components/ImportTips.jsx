import Icon from './Icon'

const SECTIONS = [
  {
    icon: 'broom',
    title: 'Before you import',
    intro: 'Good imports start before you open Excel.',
    tips: [
      {
        strong: 'Import master data first.',
        text: 'Contacts, products and pricelists are what you need to go live. Old orders and invoices are rarely worth migrating — keep the old system available read-only for history.',
      },
      {
        strong: 'Clean before importing.',
        text: 'An ERP amplifies data quality — good or bad. Remove duplicates, fix inconsistent names and drop records you no longer use (dormant customers, dead products). Less data means a cleaner Odoo and a faster start.',
      },
      {
        strong: 'Make a backup.',
        text: 'Imports are permanent — there is no undo button. Create a database backup before any import (Odoo Online: Settings → Download backup, or ask your partner).',
      },
      {
        strong: 'Don’t rebuild your old system.',
        text: 'Odoo has its own workflows. Importing every field and habit from your previous system copies its problems too. Import what Odoo needs, then work the Odoo way.',
      },
    ],
  },
  {
    icon: 'sheet',
    title: 'Filling in the template',
    intro: 'The rules Odoo applies when it reads your file.',
    tips: [
      {
        strong: 'One row per record — and delete the example row.',
        text: 'The gray italic row in the template is only there to show the expected format.',
      },
      {
        strong: 'Delete columns you don’t need.',
        text: 'An empty cell in a column you keep CLEARS that field in Odoo — it does not apply the default value. To let Odoo use its defaults, remove the whole column.',
        warning: true,
      },
      {
        strong: 'Keep the External ID (id) column.',
        text: 'Give every row a unique code (import_contacts_0001, 0002…). Odoo remembers it: re-importing the same file updates records instead of duplicating them. Never change or reuse an ID.',
      },
      {
        strong: 'Linked fields must match exactly.',
        text: 'Columns like Product Category or Country must contain the exact name as it exists in Odoo. During import you can tick “Create new values” to have missing ones created. Advanced: use a “field/id” column with external IDs when names are not unique.',
      },
      {
        strong: 'Watch the formats.',
        text: 'Multiple values (tags, taxes) are comma-separated without spaces: Manufacturer,Retailer. Dates are YYYY-MM-DD. Use a dot as decimal separator. Yes/no fields take TRUE or FALSE.',
      },
    ],
  },
  {
    icon: 'upload',
    title: 'Running the import',
    intro: 'In Odoo: open the list view → ⚙ gear icon → Import records.',
    tips: [
      {
        strong: 'Always click “Test” first.',
        text: 'Odoo checks the whole file without importing anything. Fix what it flags, test again, and only then click Import.',
      },
      {
        strong: 'Start with a small batch.',
        text: 'Import ~10 rows first and check them in Odoo. This catches wrong columns and formats while it is still easy to fix. Then import the rest.',
      },
      {
        strong: 'Split very large files.',
        text: 'Files with many thousands of rows can hit a timeout. Import in batches of a few thousand rows — with External IDs, re-running a batch is always safe.',
      },
      {
        strong: 'Mind the order.',
        text: 'Import records that others link to first: companies before their contact persons, products before pricelist rules or orders.',
      },
    ],
  },
  {
    icon: 'check',
    title: 'After the import',
    intro: 'Trust, but verify — with the source file next to Odoo.',
    tips: [
      {
        strong: 'Compare the counts.',
        text: 'Does the number of records in Odoo match the number of rows in your file? Filter the list view on “Created on: today” to see exactly what the import created.',
      },
      {
        strong: 'Spot-check a handful of records.',
        text: 'Open 3–5 random records and compare every field against your file: names, prices, categories, addresses.',
      },
      {
        strong: 'Check the links.',
        text: 'Do contact persons hang under the right company? Do products sit in the right category with the right taxes?',
      },
      {
        strong: 'Walk through a real process.',
        text: 'Create a draft quotation: pick an imported customer, add an imported product. If the price, taxes and address come through correctly, your import is genuinely done.',
      },
      {
        strong: 'Found mistakes? Fix and re-import.',
        text: 'Correct the rows in your Excel file and import the same file again. Thanks to the External ID column, Odoo updates the existing records — no duplicates.',
      },
    ],
  },
]

export default function ImportTips({ onBack }) {
  return (
    <section className="step step-wide">
      <h1>Import tips &amp; best practices</h1>
      <p className="step-intro">
        Everything on this page also travels inside every downloaded template, on the “Instructions” sheet —
        so the person doing the import always has it at hand.
      </p>

      <div className="tips-grid">
        {SECTIONS.map((s) => (
          <div key={s.title} className="tips-card">
            <h2>
              <span className="tips-icon">
                <Icon name={s.icon} size={19} />
              </span>
              {s.title}
            </h2>
            <p className="tips-card-intro">{s.intro}</p>
            <ul>
              {s.tips.map((t) => (
                <li key={t.strong} className={t.warning ? 'tip-warning' : ''}>
                  <strong>{t.strong}</strong> {t.text}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="step-actions">
        <button className="btn-primary" onClick={onBack}>
          ← Back to the template builder
        </button>
      </div>
    </section>
  )
}
