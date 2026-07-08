const ODOO_PURPLE = 'FF714B67'
const GRAY = 'FF6B7280'
const EXAMPLE_COLOR = 'FF9CA3AF'
const VALIDATION_ROWS = 501 // dropdowns applied to rows 2..501

function typeLabel(field) {
  switch (field.type) {
    case 'char':
      return 'Text'
    case 'text':
      return 'Multi-line text'
    case 'boolean':
      return 'TRUE / FALSE'
    case 'integer':
      return 'Whole number'
    case 'float':
      return 'Number'
    case 'selection':
      return 'Pick from list'
    case 'many2one':
      return `Link to ${field.relation}`
    case 'many2many':
      return `Links to ${field.relation} (comma-separated)`
    default:
      return field.type
  }
}

function headerComment(field) {
  const lines = [`${field.label} — ${typeLabel(field)}`]
  lines.push(field.required ? 'REQUIRED' : 'Optional')
  if (field.help) lines.push(field.help)
  if (field.options) {
    lines.push('Allowed values: ' + field.options.map((o) => `${o.value} (${o.label})`).join(', '))
  }
  if (field.importNote) lines.push(field.importNote)
  return lines.join('\n\n')
}

function dropdownValues(field) {
  if (field.type === 'boolean') return ['TRUE', 'FALSE']
  if (field.type === 'selection' && field.options) return field.options.map((o) => o.value)
  return null
}

export async function buildTemplateWorkbook({ model, fields, version }) {
  // Lazy-loaded so the ~1 MB library only downloads when a template is generated
  const { default: ExcelJS } = await import('exceljs')
  const wb = new ExcelJS.Workbook()
  wb.creator = 'Odoo Import Template Generator'

  // ---- Sheet 1: the import template -------------------------------------
  const ws = wb.addWorksheet('Import Template', {
    views: [{ state: 'frozen', ySplit: 1 }],
  })

  ws.columns = fields.map((f) => ({
    header: f.name,
    key: f.name,
    width: Math.min(Math.max(f.name.length + 4, Math.min(String(f.example ?? '').length + 4, 30), 14), 34),
  }))

  const headerRow = ws.getRow(1)
  headerRow.height = 24
  fields.forEach((f, i) => {
    const cell = headerRow.getCell(i + 1)
    cell.font = { bold: true, color: { argb: 'FFFFFFFF' }, size: 11 }
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: f.required ? ODOO_PURPLE : GRAY },
    }
    cell.alignment = { vertical: 'middle' }
    cell.note = {
      texts: [{ text: headerComment(f) }],
      margins: { insetmode: 'auto' },
    }
  })

  // Example data row
  const exampleRow = ws.getRow(2)
  fields.forEach((f, i) => {
    const cell = exampleRow.getCell(i + 1)
    cell.value = f.example ?? ''
    cell.font = { italic: true, color: { argb: EXAMPLE_COLOR } }
  })

  // Dropdown validation for boolean / selection columns
  fields.forEach((f, i) => {
    const values = dropdownValues(f)
    if (!values) return
    const col = ws.getColumn(i + 1).letter
    for (let r = 2; r <= VALIDATION_ROWS; r++) {
      ws.getCell(`${col}${r}`).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: [`"${values.join(',')}"`],
        showErrorMessage: true,
        errorTitle: 'Invalid value',
        error: `Choose one of: ${values.join(', ')}`,
      }
    }
  })

  // ---- Sheet 2: instructions ---------------------------------------------
  const info = wb.addWorksheet('Instructions')
  info.columns = [{ width: 4 }, { width: 30 }, { width: 90 }]

  const title = info.getCell('B2')
  title.value = `How to import ${model.name} into Odoo ${version}`
  title.font = { bold: true, size: 16, color: { argb: ODOO_PURPLE } }

  const steps = [
    ['1.', 'Fill in your data on the "Import Template" sheet — one row per record.'],
    ['2.', 'The gray italic row is an example: replace it with real data or delete it before importing.'],
    ['3.', 'Hover over a column header to see what the field expects. Purple headers are required.'],
    ['4.', 'Delete columns you do not want to set. Important: an empty cell in an included column CLEARS that field in Odoo — it does not apply the default value. To get defaults, remove the whole column.'],
    ['5.', 'Save the file, then in Odoo open the matching list view (e.g. ' + (model.slug === 'products' ? 'Sales → Products' : 'Contacts') + ').'],
    ['6.', 'Click the ⚙ gear icon (or Favorites menu) → "Import records" and upload this file.'],
    ['7.', 'Odoo matches the columns automatically because they use technical field names. Check the preview.'],
    ['8.', 'For link fields (category, country…): values must match existing records exactly, or tick "Create new values" where offered.'],
    ['9.', 'Click "Test" first — Odoo checks everything without importing. Fix any red rows, then click "Import".'],
  ]
  let r = 4
  for (const [n, text] of steps) {
    info.getCell(`B${r}`).value = n
    const c = info.getCell(`C${r}`)
    c.value = text
    c.alignment = { wrapText: true, vertical: 'top' }
    r += 1
  }

  r += 1
  const tip = info.getCell(`C${r}`)
  tip.value = fields.some((f) => f.name === 'id')
    ? 'Tip: the "id" column holds your own external IDs (e.g. import_contacts_0001). Odoo remembers them — importing the same file again updates those records instead of duplicating them. Keep the IDs unique and never reuse one for a different record.'
    : 'Tip: to be able to update records with a later import, add a column "id" with your own external IDs (e.g. import_contacts_0001). Importing the same file twice then updates instead of duplicating.'
  tip.font = { italic: true }
  tip.alignment = { wrapText: true, vertical: 'top' }
  r += 2

  const goodToKnowTitle = info.getCell(`B${r}`)
  goodToKnowTitle.value = 'Good to know'
  goodToKnowTitle.font = { bold: true, size: 13, color: { argb: ODOO_PURPLE } }
  r += 1
  const goodToKnow = [
    'Imports are permanent — there is no undo. Make a database backup first and start with a small test batch (e.g. 10 rows) before importing everything.',
    'Linked records can be matched three ways: by exact name (how this template is set up), by external ID using a "field/id" column, or by database ID using "field/.id" (rare). Use "field/id" when migrating from another system and names are not unique.',
    'Columns with multiple values (tags, taxes) are comma-separated without spaces: Manufacturer,Retailer.',
    'Dates must be YYYY-MM-DD (e.g. 2026-07-24). Use a dot as decimal separator for numbers to be safe.',
    'Very large files can hit a timeout — split them and import in batches of a few thousand rows.',
    'Re-importing this file with the same "id" values updates the existing records. Never change or reuse an id — that creates duplicates or overwrites the wrong record.',
  ]
  for (const text of goodToKnow) {
    const bullet = info.getCell(`B${r}`)
    bullet.value = '•'
    bullet.alignment = { vertical: 'top', horizontal: 'right' }
    const c = info.getCell(`C${r}`)
    c.value = text
    c.alignment = { wrapText: true, vertical: 'top' }
    r += 1
  }
  r += 1

  // Field reference table
  const tableHead = ['Column', 'Field', 'Type', 'Required', 'Example', 'Notes']
  const headRow = info.getRow(r)
  tableHead.forEach((h, i) => {
    const cell = headRow.getCell(i + 2)
    cell.value = h
    cell.font = { bold: true, color: { argb: 'FFFFFFFF' } }
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: ODOO_PURPLE } }
  })
  info.getColumn(2).width = 30
  info.getColumn(3).width = 28
  info.getColumn(4).width = 24
  info.getColumn(5).width = 10
  info.getColumn(6).width = 26
  info.getColumn(7).width = 70
  r += 1

  for (const f of fields) {
    const row = info.getRow(r)
    const notes = []
    if (f.help) notes.push(f.help)
    if (f.options) notes.push('Allowed: ' + f.options.map((o) => `${o.value} (${o.label})`).join(', '))
    if (f.importNote) notes.push(f.importNote)
    const cells = [f.name, f.label, typeLabel(f), f.required ? 'Yes' : '', String(f.example ?? ''), notes.join(' — ')]
    cells.forEach((v, i) => {
      const cell = row.getCell(i + 2)
      cell.value = v
      cell.alignment = { wrapText: true, vertical: 'top' }
      if (i === 0) cell.font = { name: 'Courier New', size: 10 }
    })
    r += 1
  }

  return wb
}

export async function downloadTemplate({ model, fields, version }) {
  const wb = await buildTemplateWorkbook({ model, fields, version })
  const buffer = await wb.xlsx.writeBuffer()
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  })
  const filename = `odoo${version}_${model.slug}_import_template.xlsx`
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
  return filename
}
