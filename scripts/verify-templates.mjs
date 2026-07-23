// Builds every template combination (model × Odoo version) outside the browser
// and asserts the generated .xlsx files are correct. Run with: npm run verify
import { tmpdir } from 'node:os'
import { mkdtempSync } from 'node:fs'
import { join } from 'node:path'
import { buildTemplateWorkbook } from '../src/excel/buildTemplate.js'
import { MODULES, ODOO_VERSIONS, fieldsForVersion } from '../src/data/registry.js'
import ExcelJS from 'exceljs'

const outDir = mkdtempSync(join(tmpdir(), 'odoo-templates-'))
let failures = 0
const check = (cond, msg) => {
  if (!cond) failures++
  console.log(`  ${cond ? '✓' : '✗'} ${msg}`)
}

for (const mod of MODULES) {
  for (const model of mod.models) {
    for (const version of ODOO_VERSIONS) {
      const fields = fieldsForVersion(model, version)
      const wb = await buildTemplateWorkbook({ model, fields, version })
      const file = join(outDir, `odoo${version}_${model.slug}.xlsx`)
      await wb.xlsx.writeFile(file)

      const rb = new ExcelJS.Workbook()
      await rb.xlsx.readFile(file)
      const ws = rb.getWorksheet('Import Template')
      const info = rb.getWorksheet('Instructions')
      console.log(`\n${model.id} — Odoo ${version} (${fields.length} fields)`)

      const headers = []
      ws.getRow(1).eachCell((c) => headers.push(c.value))
      check(
        headers.length === fields.length && headers.every((h, i) => h === fields[i].name),
        `headers match field names (${headers.length})`
      )
      check(headers[0] === 'id', 'external ID column is first')
      check(
        String(ws.getRow(2).getCell(1).value || '').startsWith('import_'),
        'external ID example present'
      )
      const probeIdx = headers.indexOf('name') >= 0 ? headers.indexOf('name') : 1
      const exampleName = ws.getRow(2).getCell(probeIdx + 1).value
      check(exampleName && String(exampleName).length > 0, `example row present ("${exampleName}")`)
      check(ws.getRow(1).getCell(1).note != null, 'header cell 1 has a comment')
      const reqIdx = fields.findIndex((f) => f.required)
      if (reqIdx >= 0) {
        check(
          ws.getRow(1).getCell(reqIdx + 1).fill?.fgColor?.argb === 'FF714B67',
          `required header (${fields[reqIdx].name}) is Odoo purple`
        )
      }
      const boolIdx = fields.findIndex((f) => f.type === 'boolean')
      if (boolIdx >= 0) {
        const col = ws.getColumn(boolIdx + 1).letter
        const dv = ws.getCell(`${col}3`).dataValidation
        check(
          dv?.type === 'list' && dv.formulae?.[0]?.includes('TRUE'),
          `boolean dropdown on ${fields[boolIdx].name}`
        )
      }
      check(info != null, 'Instructions sheet present')
      check(ws.views?.[0]?.ySplit === 1, 'header row frozen')

      // Version-specific spot checks for known 18-only fields
      if (model.id === 'res.partner') {
        check(headers.includes('mobile') === (version === '18'), `mobile only in v18 (v${version})`)
        check(!headers.includes('team_id'), 'team_id absent (removed in Odoo 18)')
      }
      if (model.id === 'product.template') {
        check(headers.includes('uom_po_id') === (version === '18'), `uom_po_id only in v18 (v${version})`)
      }
      if (model.id === 'sale.order') {
        check(
          headers.includes('order_line/tax_ids') === (version === '19') &&
            headers.includes('order_line/tax_id') === (version === '18'),
          `order line taxes column matches version (v${version})`
        )
        check(
          headers.includes('order_line/product_uom_id') === (version === '19') &&
            headers.includes('order_line/product_uom') === (version === '18'),
          `order line unit column matches version (v${version})`
        )
      }
      if (model.id === 'project.project') {
        check(
          headers.includes('allow_recurring_tasks') === (version === '19'),
          `allow_recurring_tasks only in v19 (v${version})`
        )
        check(
          headers.filter((h) => h === 'privacy_visibility').length === 1,
          'exactly one privacy_visibility column'
        )
      }
      if (model.id === 'project.task') {
        const priorityField = fields.find((f) => f.name === 'priority')
        check(
          priorityField.options.length === (version === '19' ? 4 : 2),
          `priority has ${version === '19' ? 4 : 2} levels (v${version})`
        )
        check(headers.filter((h) => h === 'priority').length === 1, 'exactly one priority column')
      }
      if (model.id === 'crm.lead') {
        check(headers.includes('mobile') === (version === '18'), `lead mobile only in v18 (v${version})`)
        check(headers.includes('title') === (version === '18'), `lead title only in v18 (v${version})`)
        check(headers.includes('email_from'), 'lead email column is email_from')
      }
      if (model.id === 'purchase.order') {
        check(
          headers.includes('order_line/tax_ids') === (version === '19') &&
            headers.includes('order_line/taxes_id') === (version === '18'),
          `PO line taxes column matches version (v${version})`
        )
        check(
          headers.includes('order_line/product_uom_id') === (version === '19') &&
            headers.includes('order_line/product_uom') === (version === '18'),
          `PO line unit column matches version (v${version})`
        )
      }
      if (model.id === 'product.supplierinfo') {
        check(
          headers.includes('product_uom_id') === (version === '19') &&
            headers.includes('product_uom') === (version === '18'),
          `supplierinfo unit column matches version (v${version})`
        )
      }
      if (model.id === 'stock.location') {
        for (const f of ['posx', 'posy', 'posz', 'scrap_location']) {
          check(headers.includes(f) === (version === '18'), `location ${f} only in v18 (v${version})`)
        }
      }
      if (model.id === 'stock.quant') {
        check(headers.includes('inventory_quantity'), 'quant uses writable inventory_quantity')
        check(!headers.includes('quantity'), 'quant excludes read-only quantity')
      }
      if (model.id === 'mrp.bom') {
        check(headers.includes('batch_size') === (version === '19'), `bom batch_size only in v19 (v${version})`)
        check(headers.some((h) => h.startsWith('bom_line_ids/')), 'bom has component line columns')
      }
      if (model.id === 'mrp.production') {
        check(!headers.includes('state'), 'MO excludes read-only state')
        check(!headers.includes('name'), 'MO excludes auto-numbered name')
      }
      if (model.id === 'hr.leave.type') {
        check(
          headers.includes('show_on_dashboard') === (version === '18') &&
            headers.includes('hide_on_dashboard') === (version === '19'),
          `type dashboard field matches version (v${version})`
        )
        const ra = fields.find((f) => f.name === 'requires_allocation')
        check(
          ra.type === (version === '18' ? 'selection' : 'boolean'),
          `requires_allocation type matches version (v${version})`
        )
        check(headers.filter((h) => h === 'requires_allocation').length === 1, 'one requires_allocation column')
        check(headers.filter((h) => h === 'employee_requests').length === 1, 'one employee_requests column')
      }
      if (model.id === 'hr.leave.allocation') {
        check(!headers.includes('state'), 'allocation excludes read-only state')
        check(!headers.includes('allocation_type'), 'allocation excludes read-only allocation_type')
      }
      if (model.id === 'hr.leave') {
        check(!headers.includes('state'), 'leave excludes read-only state')
        check(headers.includes('request_date_from') && !headers.includes('date_from'), 'leave uses request_date_from')
      }
      if (model.id === 'res.partner.bank') {
        check(
          headers.includes('clearing_number') === (version === '19'),
          `clearing_number only in v19 (v${version})`
        )
        check(headers.includes('note') === (version === '19'), `note only in v19 (v${version})`)
      }
    }
  }
}

console.log(failures === 0 ? `\nALL CHECKS PASSED (files in ${outDir})` : `\n${failures} CHECKS FAILED`)
process.exit(failures === 0 ? 0 : 1)
